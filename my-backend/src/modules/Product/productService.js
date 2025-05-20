  // 📁 modules/Product/productService.js
  // ===========================================================
  //  Product Service – SQL Server (mssql)                       
  // ===========================================================
  const { sql, poolPromise } = require("@shared/db/sql");
  const TABLE = "SanPham";

  // -----------------------------------------------------------
  // Helper
  // -----------------------------------------------------------
  const pickCols = [
    "ma_san_pham", "ten_san_pham", "loai", "thuong_hieu",
    "gia_thanh", "giam_gia", "so_gram", "nguon_goc",
    "han_su_dung", "so_luong", "danh_muc_id",
  ];

  /* -------------------------------------------------- */
  /* 1. GET ALL                                         */
  /* -------------------------------------------------- */
  exports.getAll = async (req) => {
    const pool = await poolPromise;
    const hasLoai = !!req.query.loai;

    const rs = await pool.request()
      .input("loai", sql.NVarChar, `%${req.query.loai || ""}%`)
      .query(`
        SELECT s.*,
              (SELECT TOP 1 image_url
                FROM SanPhamAnh a
                WHERE a.san_pham_id = s.id AND a.is_main = 1) AS thumb
        FROM ${TABLE} s
        ${hasLoai ? "WHERE s.loai LIKE @loai" : ""}
      `);

    return rs.recordset;
  };

  /* -------------------------------------------------- */
  /* 2. GET BY ID                                       */
  /* -------------------------------------------------- */
  exports.getById = async (req, id) => {
    const pool = await poolPromise;

    const rs = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM ${TABLE} WHERE id = @id`);

    const product = rs.recordset[0];
    if (!product) return null;

    const imgs = await pool.request()
      .input("sp", sql.Int, id)
      .query(`
        SELECT * FROM SanPhamAnh
        WHERE san_pham_id = @sp
        ORDER BY uploaded_at
      `);

    product.images = imgs.recordset;
    return product;
  };

  /* -------------------------------------------------- */
  /* 3. CREATE                                          */
  /* -------------------------------------------------- */
  exports.create = async ({ body, username }) => {
    const pool = await poolPromise;
    const tx   = new sql.Transaction(pool);

    try {
      await tx.begin();

      const req = new sql.Request(tx);
      pickCols.forEach((col) =>
        req.input(col, body[col] != null ? body[col] : null)
      );
      req.input("username", sql.NVarChar, username); // dùng để ghi log

      const ins = await req.query(`
        INSERT INTO ${TABLE} ( ${pickCols.join(", ")} )
        OUTPUT inserted.*
        VALUES ( ${pickCols.map(c => "@" + c).join(", ")} )
      `);

      // ✅ giữ biến product_id, chỉ đổi tên cột thành san_pham_id
      await new sql.Request(tx)
        .input("product_id", sql.Int, ins.recordset[0].id)
        .input("action", sql.NVarChar, "CREATE")
        .input("performed_by", sql.NVarChar, username)
        .query(`
          INSERT INTO LichSuSanPham(san_pham_id, hanh_dong, nhan_vien_login)
          VALUES (@product_id, @action, @performed_by);
        `);

      await tx.commit();
      return ins.recordset[0];
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  };


  /* -------------------------------------------------- */
  /* 4. UPDATE                                          */
  /* -------------------------------------------------- */
  exports.update = async (id, body, username) => {
    const pool = await poolPromise;
    const tx   = new sql.Transaction(pool);

    try {
      await tx.begin();

      const req = new sql.Request(tx)
        .input("id", sql.Int, id)
        .input("username", sql.NVarChar, username);

      pickCols.forEach((c) => req.input(c, body[c] != null ? body[c] : null));

      const up = await req.query(`
        UPDATE ${TABLE}
        SET ma_san_pham = COALESCE(@ma_san_pham, ma_san_pham),
            ten_san_pham = COALESCE(@ten_san_pham, ten_san_pham),
            loai = COALESCE(@loai, loai),
            thuong_hieu = COALESCE(@thuong_hieu, thuong_hieu),
            gia_thanh = COALESCE(@gia_thanh, gia_thanh),
            giam_gia = COALESCE(@giam_gia, giam_gia),
            so_gram = COALESCE(@so_gram, so_gram),
            nguon_goc = COALESCE(@nguon_goc, nguon_goc),
            han_su_dung = COALESCE(@han_su_dung, han_su_dung),
            so_luong = COALESCE(@so_luong, so_luong),
            danh_muc_id = COALESCE(@danh_muc_id, danh_muc_id),
            updated_at = GETDATE()
            -- updated_by = @username  ← comment nếu chưa có cột
        OUTPUT inserted.*
        WHERE id = @id
      `);

      if (up.rowsAffected[0] === 0) {
        await tx.rollback();
        return null;
      }

      await new sql.Request(tx)
        .input("product_id", sql.Int, id)
        .input("action", sql.NVarChar, "UPDATE")
        .input("performed_by", sql.NVarChar, username)
        .query(`
          INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login)
          VALUES (@product_id, @action, @performed_by)
        `);  // ✅ sửa product_id → san_pham_id

      await tx.commit();
      return up.recordset[0];
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  };

  /* -------------------------------------------------- */
  /* 5. GET NEWEST                                      */
  /* -------------------------------------------------- */
  exports.getNewest = async (req, limit = 10) => {
    const pool = await poolPromise;
    const rs = await pool.request()
      .input("n", sql.Int, limit)
      .query(`
        SELECT TOP (@n) s.*,
              (SELECT TOP 1 image_url
                FROM SanPhamAnh a
                WHERE a.san_pham_id = s.id AND a.is_main = 1) AS thumb
        FROM ${TABLE} s
        ORDER BY s.created_at DESC
      `);
    return rs.recordset;
  };

  /* -------------------------------------------------- */
/* 6. REMOVE                                          */
/* -------------------------------------------------- */
exports.remove = async (id, username) => {
  const pool = await poolPromise;
  const tx = new sql.Transaction(pool);

  try {
    await tx.begin();

    // ✅ 1) Ghi log trước khi xóa
    await new sql.Request(tx)
      .input("product_id", sql.Int, id)
      .input("action", sql.NVarChar, "DELETE")
      .input("performed_by", sql.NVarChar, username)
      .query(`
        INSERT INTO LichSuSanPham (san_pham_id, hanh_dong, nhan_vien_login)
        VALUES (@product_id, @action, @performed_by)
      `);

    // ✅ 2) Sau đó mới xóa sản phẩm
    const del = await new sql.Request(tx)
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM ${TABLE}
        OUTPUT deleted.*
        WHERE id = @id
      `);

    if (del.rowsAffected[0] === 0) {
      await tx.rollback();
      return null;
    }

    await tx.commit();
    return del.recordset[0];
  } catch (err) {
    await tx.rollback();
    throw err;
  }
};




  module.exports = exports;
