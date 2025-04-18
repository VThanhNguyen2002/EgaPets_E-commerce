const { sql, poolPromise } = require('@shared/db/sql');   // SQL Server
const TABLE = 'GioHang';

/* --------------------- CART --------------------- */
async function addItem({ customerId, sessionId, productId, quantity, price, discount }) {
  const pool = await poolPromise;
  await pool.request()
    .input('kh',  sql.Int,  customerId   || null)
    .input('sid', sql.NVarChar, sessionId || null)
    .input('sp',  sql.Int,  productId)
    .input('q',   sql.Int,  quantity)
    .input('p',   sql.Decimal, price)
    .input('d',   sql.Decimal, discount)
    .query(`
      INSERT INTO ${TABLE} (khach_hang_id, session_id, san_pham_id, so_luong, gia, giam_gia)
      VALUES (@kh, @sid, @sp, @q, @p, @d)
    `);
}

async function listItems({ customerId, sessionId }) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('kh',  sql.Int,        customerId   || null)
    .input('sid', sql.NVarChar,   sessionId || null)
    .query(`
      SELECT g.*, s.ten_san_pham
      FROM ${TABLE} g
      JOIN SanPham s ON s.id = g.san_pham_id
      WHERE ( (@kh IS NOT NULL AND g.khach_hang_id = @kh)
           OR (@sid IS NOT NULL AND g.session_id     = @sid) )
    `);
  return rs.recordset;
}

async function updateQty(id, qty) {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .input('q',  sql.Int, qty)
    .query(`UPDATE ${TABLE} SET so_luong = @q WHERE id = @id`);
}

async function remove(id) {
  const pool = await poolPromise;
  await pool.request().input('id', sql.Int, id)
    .query(`DELETE FROM ${TABLE} WHERE id = @id`);
}

/* ------------------ CHECKOUT -------------------- */
async function cartSummary({ customerId, sessionId }) {
  const items = await listItems({ customerId, sessionId });
  const subTotal = items.reduce(
    (s, i) => s + i.so_luong * i.gia * (1 - i.giam_gia / 100), 0
  );
  return { items, subTotal, shippingFee: 0, grandTotal: subTotal };
}

module.exports = { addItem, listItems, updateQty, remove, cartSummary };
