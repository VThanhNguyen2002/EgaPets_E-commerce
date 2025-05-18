// ✅ 2. src/modules/PaymentMethod/paymentMethod.service.js
const db = require("../../shared/db");

exports.fetchAll = async () => {
  const result = await db.query("SELECT id, ten_phuong_thuc FROM PhuongThucThanhToan");
  return result.recordset;
};