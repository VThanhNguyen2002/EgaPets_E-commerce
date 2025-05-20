// ✅ 1. src/modules/PaymentMethod/paymentMethod.controller.js
const paymentService = require("./paymentMethod.service");

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const data = await paymentService.fetchAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi truy vấn phương thức thanh toán", error: error.message });
  }
};
