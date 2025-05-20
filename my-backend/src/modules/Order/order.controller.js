const orderSrv = require("./order.service");

exports.checkout = async (req, res) => {
  try {
    const result = await orderSrv.createOrder(req.body);
    res.json(result);                           // { orderId, amount }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Tạo đơn thất bại" });
  }
};

exports.getPayStatus = async (req, res) => {
  try {
    const status = await orderSrv.getPaymentStatus(+req.params.id);
    res.json({ status });                      // success | pending
  } catch {
    res.status(500).json({ status: "pending" });
  }
};
