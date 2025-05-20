const { sql, getPool } = require("@shared/db/sql");

/* helper: transaction wrapper */
async function withTx(fn) {
  const pool = await getPool();
  const tx   = new sql.Transaction(pool);
  await tx.begin();
  try {
    const res = await fn(tx);      // ⇠ thực thi logic bên trong
    await tx.commit();
    return res;
  } catch (e) {
    await tx.rollback();
    throw e;
  }
}

function randomPhone() {
  return '09' + Math.floor(1e8 + Math.random() * 9e8); // 10-digit VN-ish
}

/**
 * Trả về { userId, khachHangId } nếu tìm thấy theo email / phone,
 * ngược lại null → caller tự tạo mới.
 */
async function findGuestByContact(tx, { email, phone }) {
  if (!email && !phone) return null;

  const cond = [];
  if (email) cond.push('u.email = @mail');
  if (phone) cond.push('k.so_dien_thoai = @phone');

  const { recordset } = await tx.request()
    .input('mail',  sql.NVarChar, email || null)
    .input('phone', sql.NVarChar, phone || null)
    .query(`
      SELECT u.id       AS userId,
             k.id       AS khId
      FROM   Users u
      JOIN   KhachHang k ON k.user_id = u.id
      WHERE  ${cond.join(' OR ')}
    `);

  return recordset[0] ?? null;
}


/* helper: tạo Users guest & KhachHang guest khi chưa có customerId */
async function createGuestCustomer(tx, { hoTen, phone, email = null }) {
  /** 1. Users -------------------------------------------------------- */
  const { recordset:[{ id: userId }] } = await tx.request()
    .input('uname', sql.NVarChar, `guest_${Date.now()}`)   // always unique
    .input('phash', sql.VarBinary, Buffer.alloc(64, 0))
    .input('role',  sql.NVarChar, 'KhachHang')
    .input('mail',  sql.NVarChar, email)
    .query(`
      INSERT INTO Users(username, password_hash, role, email)
      OUTPUT INSERTED.id
      VALUES (@uname, @phash, @role, @mail)
    `);

  /** 2. KhachHang ---------------------------------------------------- */
  const { recordset:[{ id: khId }] } = await tx.request()
    .input('uid',   sql.Int,      userId)
    .input('hoten', sql.NVarChar, hoTen)
    .input('phone', sql.NVarChar, phone || randomPhone())
    .query(`
      INSERT INTO KhachHang(user_id, ho_ten, so_dien_thoai)
      OUTPUT INSERTED.id
      VALUES(@uid, @hoten, @phone)
    `);

  return khId;
}

/**
 * Bảo đảm có khach_hang_id hợp lệ – tái sử dụng nếu có email/phone trùng.
 */
async function ensureCustomer(tx, customerId, info = {}) {
  const numeric = Number(customerId);

  /* 1 — đã login */
  if (Number.isInteger(numeric) && numeric > 0) {
    const { recordset } = await tx.request()
      .input('cid', sql.Int, numeric)
      .query('SELECT 1 FROM KhachHang WHERE id = @cid');
    if (recordset.length) return numeric;
  }

  /* 2 — guest: thử tìm theo email/phone trước */
  const found = await findGuestByContact(tx, info);
  if (found) return found.khId;

  /* 3 — chưa có ⇒ tạo mới */
  const hoTen = (info.hoTen || info.name || 'Khách vãng lai').trim();
  const phone = (info.phone || randomPhone()).trim();
  return createGuestCustomer(tx, { hoTen, phone, email: info.email });
}

async function ensureProduct(tx, productId) {
  const { recordset } = await tx.request()
    .input('pid', sql.Int, productId)
    .query('SELECT 1 FROM SanPham WHERE id = @pid');
  if (!recordset.length) {
    throw new Error(`Product id ${productId} không tồn tại`);
  }
}


/* ─────────────────────────── CREATE ORDER ─────────────────────────── */
exports.createOrder = async ({
  customerId,
  guestInfo = {},
  items = [],
  discount = 0,
  payMethod,
}) => withTx(async (tx) => {
  /* 0) khách hàng */
  const khId = await ensureCustomer(tx, customerId, guestInfo);

  /* 1) kiểm tra & tính tiền */
  let subTotal = 0;
  for (const it of items) {
    await ensureProduct(tx, it.id);            // ★ kiểm tra FK trước
    subTotal += it.price * it.qty;
  }
  const grandTotal = subTotal * (1 - discount / 100);

  /* 2) HoaDon */
  const { recordset:[{ id: orderId }] } = await tx.request()
    .input('cust',   sql.Int,     khId)
    .input('total',  sql.Decimal, grandTotal)
    .input('dc',     sql.Decimal, discount)
    .input('method', sql.Int,     payMethod)
    .query(`
      INSERT INTO HoaDon(khach_hang_id, tong_tien, giam_gia_hoa_don, phuong_thuc_id)
      OUTPUT INSERTED.id
      VALUES(@cust, @total, @dc, @method)
    `);

  /* 3) ChiTietHoaDon */
  for (const it of items) {
    await tx.request()
      .input('hd',    sql.Int,     orderId)
      .input('sp',    sql.Int,     it.id)          // đúng productId INT
      .input('qty',   sql.Int,     it.qty)
      .input('price', sql.Decimal, it.price)
      .input('gg',    sql.Decimal, it.discount ?? 0)
      .query(`
        INSERT INTO ChiTietHoaDon(hoa_don_id, san_pham_id, so_luong, gia, giam_gia_san_pham)
        VALUES(@hd, @sp, @qty, @price, @gg)
      `);
  }

  return { orderId, amount: grandTotal };
});


/* ─────────────────────────── UPDATE / QUERY status ────────────────── */
exports.updateBillStatus = (orderId, status) =>
  (getPool()).then(pool => pool.request()
    .input("st", sql.NVarChar, status)
    .input("id", sql.Int,      orderId)
    .query(/*sql*/`
      UPDATE HoaDon
      SET trang_thai =
          CASE WHEN @st = N'success' THEN N'Đã thanh toán'
               WHEN @st = N'fail'    THEN N'Hủy'            END
      WHERE id = @id
    `));

exports.getPaymentStatus = async (orderId) => {
  const pool = await getPool();
  const { recordset:[row] } = await pool.request()
    .input("id", sql.Int, orderId)
    .query("SELECT trang_thai FROM HoaDon WHERE id = @id");
  return row ? (row.trang_thai === "Đã thanh toán" ? "success" : "pending") : "pending";
};
