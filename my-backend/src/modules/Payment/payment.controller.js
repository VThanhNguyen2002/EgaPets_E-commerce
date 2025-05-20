const momo      = require("@shared/helpers/momo");
const paySrv    = require("./payment.service");
const orderSrv  = require("../Order/order.service");

/* POST /api/payments/momo */
exports.createMomo = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const momoOrderId = `${orderId}-${Date.now()}`;     // duy nhất
    const momoRes     = await momo.createPayment(amount, momoOrderId);

    await paySrv.createPaymentRecord({
      orderId,
      methodId  : 1,
      qr        : momoRes.qrCodeUrl,
      requestId : momoOrderId,
    });

    res.json(momoRes);
  } catch (err) {
    console.error("MoMo ERR:", err.response?.data || err.message);
    res.status(500).json({ error: "Tạo yêu cầu thanh toán thất bại" });
  }
};

/* IPN từ MoMo */
exports.ipnMomo = async (req, res) => {
  try {
    const { orderId: momoOrderId, resultCode } = req.body;   // 58-xxx
    const [orderId] = momoOrderId.split("-");
    const status    = resultCode === 0 ? "success" : "pending";

    await paySrv.updateStatus({
      orderId   : +orderId,
      requestId : momoOrderId,
      status,
    });
    await orderSrv.updateBillStatus(+orderId, status);

    res.json({ result: "ok" });
  } catch (e) {
    console.error("IPN MoMo error:", e);
    res.status(500).end();
  }
};
