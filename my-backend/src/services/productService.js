const { db } = require("../config/index.js");
const { poolPromise } = db;

const getAllProducts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM SanPham"); // 💥 Bảng của bạn trong SQL Server
    return result.recordset;
  } catch (error) {
    console.error("❌ Lỗi getAllProducts:", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM SanPham WHERE id = @id");
    return result.recordset[0];
  } catch (error) {
    console.error("❌ Lỗi getProductById:", error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
