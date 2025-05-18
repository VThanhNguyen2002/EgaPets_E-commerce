// ✅ 1. src/modules/PaymentMethod/paymentMethod.controller.js
const db = require("../../shared/db");

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const result = await db.query("SELECT id, ten_phuong_thuc FROM PhuongThucThanhToan");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi truy vấn phương thức thanh toán", error: error.message });
  }
};