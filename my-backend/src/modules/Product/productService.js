/**
 * Hỗ trợ 2 nguồn: SQL Server (default) & MongoDB (dùng cho chatbot).
 * Truyền ?source=mongo trên query để switch, hoặc đặt process.env.PRODUCT_SOURCE=mongo.
 */
const { sql, poolPromise } = require('@shared/db/sql');
const ProductModel         = require('@modules/Product/Product');
const TABLE_NAME = 'SanPham';

const isMongo = (req) =>
  (req.query.source || process.env.PRODUCT_SOURCE || '').toLowerCase() === 'mongo';

async function getAll(req) {
  if (isMongo(req)) {
    return await ProductModel.find().lean();
  }
  const pool   = await poolPromise;
  const result = await pool.request().query(`SELECT * FROM ${TABLE_NAME}`);
  return result.recordset;
}

async function getById(req, id) {
  if (isMongo(req)) {
    return await ProductModel.findById(id).lean();
  }
  const pool   = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.Int, id)           // id là INT trong SQL
    .query(`SELECT * FROM ${TABLE_NAME} WHERE id = @id`);
  return result.recordset[0];
}

async function create({ body, username }) {
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('ma',  sql.NVarChar, body.ma_san_pham)
    .input('ten', sql.NVarChar, body.ten_san_pham)
    .input('gia', sql.Decimal,  body.gia_thanh)
    /* ... các field khác */
    .query(`
      INSERT INTO SanPham (ma_san_pham, ten_san_pham, gia_thanh)
      OUTPUT inserted.*
      VALUES (@ma, @ten, @gia)
    `);
  /* ghi lịch sử */
  await pool.request()
    .input('SpId',   sql.Int, rs.recordset[0].id)
    .input('Action', sql.NVarChar, 'Thêm')
    .input('User',   sql.NVarChar, username)
    .input('Note',   sql.NVarChar, 'Thêm mới sản phẩm')
    .query(`
      INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login, noi_dung_thay_doi)
      VALUES (@SpId, @Action, @User, @Note)
    `);
  return rs.recordset[0];
}

async function update(id, body, username) {
  /* Gọi stored procedure để update & log */
  const pool = await poolPromise;
  const rs = await pool.request()
    .input('productId', sql.Int, id)
    .input('ten',       sql.NVarChar, body.ten_san_pham)
    .input('gia',       sql.Decimal,  body.gia_thanh)
    .input('userName',  sql.NVarChar, username)
    .execute('usp_UpdateSanPham');
  return rs.recordset;
}

module.exports = { getAll, getById, create, update };

