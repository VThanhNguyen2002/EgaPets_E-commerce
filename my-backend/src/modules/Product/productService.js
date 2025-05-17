// 📁 modules/Product/productService.js
/**
 * Hỗ trợ 2 nguồn: SQL Server (default) & MongoDB (dùng cho chatbot).
 * Truyền ?source=mongo trên query để switch, hoặc đặt process.env.PRODUCT_SOURCE=mongo.
 */
const { sql, poolPromise } = require('@shared/db/sql');
const ProductModel         = require('@modules/Product/Product');
const TABLE_NAME           = 'SanPham';

/* -------------------------------------------------- */
/* Helper                                             */
/* -------------------------------------------------- */
const getSource = (req) =>
  (req.query.source || process.env.PRODUCT_SOURCE || '').toLowerCase();

const isMongo = (req) => getSource(req) === 'mongo';

/* -------------------------------------------------- */
/* 1️⃣  GET ALL – thêm filter theo ?loai=              */
/* -------------------------------------------------- */
async function getAll(req) {
  /* -------- MongoDB ---------- */
  if (isMongo(req)) {
    const filter = req.query.loai ? { loai: req.query.loai } : {};
    return await ProductModel.find(filter).lean();
  }

  /* -------- SQL Server ------- */
  const pool = await poolPromise;

  /* nếu có ?loai=… → thêm WHERE  */
  const hasLoai = !!req.query.loai;
  const result = await pool.request()
  .input('loai', sql.NVarChar, `%${req.query.loai || ''}%`)
    .query(`
      SELECT s.*,
             (SELECT TOP 1 image_url
              FROM SanPhamAnh a
              WHERE a.san_pham_id = s.id AND a.is_main = 1) AS thumb
      FROM ${TABLE_NAME} s
      ${hasLoai ? 'WHERE s.loai LIKE @loai' : ''}
    `);

  return result.recordset;
}

/* -------------------------------------------------- */
/* 2️⃣  GET BY ID (không đổi)                          */
/* -------------------------------------------------- */
async function getById(req, id) {
  if (isMongo(req)) {
    return await ProductModel.findById(id).lean();
  }

  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query(`SELECT * FROM ${TABLE_NAME} WHERE id = @id`);

  const product = result.recordset[0];

  if (product) {
    const imgs = await pool.request()
      .input('sp', sql.Int, id)
      .query(`
        SELECT * FROM SanPhamAnh
        WHERE san_pham_id = @sp
        ORDER BY uploaded_at
      `);
    product.images = imgs.recordset;
  }
  return product;
}

/* -------------------------------------------------- */
/* 3️⃣  CREATE / UPDATE (giữ nguyên)                   */
/* -------------------------------------------------- */
async function create({ body, username }) { /* … */ }
async function update(id, body, username)  { /* … */ }

/* Lấy N sản phẩm mới nhất (order by created_at DESC) */
async function getNewest(req, limit = 10) {
  if (isMongo(req)) {
    return await ProductModel.find()
      .sort({ created_at: -1 })
      .limit(limit)
      .lean();
  }

  const pool = await poolPromise;
  const rs = await pool.request()
    .input('n', sql.Int, limit)
    .query(`
      SELECT TOP (@n) s.*,
             (SELECT TOP 1 image_url
              FROM SanPhamAnh a
              WHERE a.san_pham_id = s.id AND a.is_main = 1) AS thumb
      FROM ${TABLE_NAME} s
      ORDER BY s.created_at DESC
    `);
  return rs.recordset;
}

module.exports = { getAll, getById, create, update, getNewest };
