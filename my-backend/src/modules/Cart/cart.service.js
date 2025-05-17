// src/modules/Cart/cart.service.js
const { sql, poolPromise } = require('@shared/db/sql');
const TABLE = 'GioHang';

/* --------------------- UTILS --------------------- */
async function getKhachHangId(userId) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('uid', sql.Int, userId)
    .query('SELECT id FROM KhachHang WHERE user_id = @uid');
  return rs.recordset[0]?.id || null;
}

async function ensureKhachHangId(currentKhId, userId) {
  if (currentKhId) return currentKhId;
  return getKhachHangId(userId);
}

/* --------------------- CART --------------------- */
async function addItem({ userId, khachHangId, sessionId, productId, quantity }) {
  const pool = await poolPromise;
  khachHangId = await ensureKhachHangId(khachHangId, userId);

  const sp = await pool.request()
    .input('id', sql.Int, productId)
    .query(`SELECT gia_thanh, giam_gia FROM SanPham WHERE id = @id`);
  const product = sp.recordset[0];
  if (!product) throw new Error('Sản phẩm không tồn tại');

  const { gia_thanh, giam_gia } = product;
  const finalPrice = gia_thanh * quantity * (1 - (giam_gia || 0) / 100);

  await pool.request()
    .input('kh',  sql.Int,        khachHangId || null)
    .input('sid', sql.NVarChar,   sessionId   || null)
    .input('sp',  sql.Int,        productId)
    .input('q',   sql.Int,        quantity)
    .input('p',   sql.Decimal(18,2), finalPrice)
    .input('d',   sql.Decimal(5,2),  giam_gia || 0)
    .query(`
      MERGE ${TABLE} AS tgt
      USING (VALUES (@kh,@sid,@sp,@q,@p,@d)) AS src
            (khach_hang_id,session_id,san_pham_id,so_luong,gia,giam_gia)
      ON  ((src.khach_hang_id IS NOT NULL AND tgt.khach_hang_id = src.khach_hang_id)
           OR (src.session_id IS NOT NULL AND tgt.session_id = src.session_id))
          AND tgt.san_pham_id = src.san_pham_id
      WHEN MATCHED THEN
          UPDATE SET so_luong = tgt.so_luong + src.so_luong,
                     gia      = tgt.gia + src.gia,
                     giam_gia = src.giam_gia
      WHEN NOT MATCHED THEN
          INSERT (khach_hang_id, session_id, san_pham_id, so_luong, gia, giam_gia, is_guest)
          VALUES (src.khach_hang_id, src.session_id, src.san_pham_id, src.so_luong, src.gia, src.giam_gia,
                  CASE WHEN src.session_id IS NULL THEN 0 ELSE 1 END);
    `);
}

/* --------------------- LIST ITEMS --------------------- */
async function listItems({ userId, khachHangId, sessionId }) {
  const pool = await poolPromise;
  khachHangId = await ensureKhachHangId(khachHangId, userId);

  const rs = await pool.request()
    .input('kh',  sql.Int,      khachHangId || null)
    .input('sid', sql.NVarChar, sessionId   || null)
    .query(`
      SELECT g.*,
             s.ten_san_pham,
             s.loai,
             ISNULL(a.image_url, '') AS thumb,
             CAST(g.gia / g.so_luong AS DECIMAL(18,0)) AS don_gia
      FROM   ${TABLE} g
      JOIN   SanPham s      ON s.id = g.san_pham_id
      LEFT JOIN SanPhamAnh a ON a.san_pham_id = s.id AND a.is_main = 1
      WHERE  ( (@kh  IS NOT NULL AND g.khach_hang_id = @kh)
            OR (@sid IS NOT NULL AND g.session_id    = @sid) )
    `);

  return rs.recordset;
}


// src/modules/Cart/cart.service.js
async function updateQty(id, qty){
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .input('q',  sql.Int, qty)
    // 👉  tính lại total theo đơn-giá gốc
    .query(`
      UPDATE GioHang
      SET so_luong = @q,
          gia      = CAST(gia / NULLIF(so_luong,0) AS DECIMAL(18,2)) * @q
      WHERE id = @id
    `);
}


async function remove(id) {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .query(`DELETE FROM ${TABLE} WHERE id = @id`);
}

/* ------------------ CHECKOUT -------------------- */
async function cartSummary({ userId, khachHangId, sessionId }) {
  const items = await listItems({ userId, khachHangId, sessionId });
  const subTotal = items.reduce((sum, i) => sum + i.gia, 0);
  return { items, subTotal, shippingFee: 0, grandTotal: subTotal };
}

async function mergeGuestCart(sessionId, userId) {
  if (!sessionId) return;
  const customerId = await getKhachHangId(userId);
  const pool = await poolPromise;

  await pool.request()
    .input('sid', sql.NVarChar, sessionId)
    .input('kh',  sql.Int,      customerId)
    .query(`
      MERGE ${TABLE} AS tgt
      USING (SELECT @kh        AS khach_hang_id,
                    san_pham_id,
                    so_luong,
                    gia,
                    giam_gia
             FROM   ${TABLE}
             WHERE  session_id = @sid) AS src
           ON tgt.khach_hang_id = src.khach_hang_id
          AND tgt.san_pham_id = src.san_pham_id
      WHEN MATCHED THEN
          UPDATE SET tgt.so_luong = tgt.so_luong + src.so_luong,
                     tgt.gia      = tgt.gia + src.gia,
                     tgt.giam_gia = src.giam_gia
      WHEN NOT MATCHED THEN
          INSERT (khach_hang_id, san_pham_id, so_luong, gia, giam_gia)
          VALUES (src.khach_hang_id, src.san_pham_id, src.so_luong, src.gia, src.giam_gia);

      DELETE FROM ${TABLE} WHERE session_id = @sid;
    `);
}

module.exports = {
  addItem,
  listItems,
  updateQty,
  remove,
  cartSummary,
  mergeGuestCart,
};
