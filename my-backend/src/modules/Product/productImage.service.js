const { sql, poolPromise } = require('@shared/db/sql');
const TABLE = 'SanPhamAnh';

/* Lấy tất cả ảnh của 1 sản phẩm (id SQL) */
async function listByProductId(spId) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('sp', sql.Int, spId)
    .query(`SELECT * FROM ${TABLE} WHERE san_pham_id = @sp ORDER BY uploaded_at`);
  return rs.recordset;
}

/* Thêm 1 ảnh (đã upload Cloudinary) */
async function add(spId, { image_url, public_id, format, width, height, bytes, is_main }) {
  const pool = await poolPromise;
  // nếu ảnh đại diện, reset cờ cũ
  if (is_main) {
    await pool.request()
      .input('id', sql.Int, spId)
      .query(`UPDATE ${TABLE} SET is_main = 0 WHERE san_pham_id = @id AND is_main = 1`);
  }
  const rs = await pool.request()
    .input('sp', sql.Int, spId)
    .input('url', sql.NVarChar, image_url)
    .input('pid', sql.NVarChar, public_id)
    .input('fmt', sql.NVarChar, format)
    .input('w',   sql.Int, width)
    .input('h',   sql.Int, height)
    .input('b',   sql.Int, bytes)
    .input('m',   sql.Bit, is_main ? 1 : 0)
    .query(`
      INSERT INTO ${TABLE}(san_pham_id,image_url,public_id,format,width,height,bytes,is_main)
      OUTPUT inserted.*
      VALUES (@sp,@url,@pid,@fmt,@w,@h,@b,@m)
    `);
  return rs.recordset[0];
}

/* Xoá ảnh */
async function remove(id) {
  const pool = await poolPromise;
  await pool.request().input('id', sql.Int, id)
    .query(`DELETE FROM ${TABLE} WHERE id = @id`);
}

module.exports = { listByProductId, add, remove };
