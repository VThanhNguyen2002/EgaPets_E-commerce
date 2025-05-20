const crypto = require("crypto");
const axios  = require("axios");
require("dotenv").config();

const {
  MOMO_PARTNER_CODE,
  MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY,
  MOMO_RETURN_URL,
  MOMO_IPN_URL,
} = process.env;

/**
 * Gọi sandbox MoMo tạo giao dịch QR / deeplink
 * @param {number} amount   – số tiền VND
 * @param {number} orderId  – id hoá đơn trong DB
 * @param {string} orderInfo – mô tả (mặc định)
 */
exports.createPayment = async (amount, orderId, orderInfo = "Thanh toán EGA Pets") => {
  /* 1. build payload */
  const requestId = `${orderId}-${Date.now()}`;              // duy nhất
  const payload   = {
    partnerCode : MOMO_PARTNER_CODE,
    accessKey   : MOMO_ACCESS_KEY,
    requestId,
    amount      : String(amount),
    orderId     : String(orderId),
    orderInfo,
    redirectUrl : MOMO_RETURN_URL,
    ipnUrl      : MOMO_IPN_URL,
    extraData   : "",
    requestType : "captureWallet",
    lang        : "vi",
  };

  /* 2. raw string 100% theo thứ tự tài liệu MoMo */
  const raw = [
    `accessKey=${payload.accessKey}`,
    `amount=${payload.amount}`,
    `extraData=${payload.extraData}`,
    `ipnUrl=${payload.ipnUrl}`,
    `orderId=${payload.orderId}`,
    `orderInfo=${payload.orderInfo}`,
    `partnerCode=${payload.partnerCode}`,
    `redirectUrl=${payload.redirectUrl}`,
    `requestId=${payload.requestId}`,
    `requestType=${payload.requestType}`,
  ].join("&");

  /* 3. sign */
  payload.signature = crypto
    .createHmac("sha256", MOMO_SECRET_KEY)
    .update(raw)
    .digest("hex");

  /* 4. call MoMo */
  const { data } = await axios.post(
    "https://test-payment.momo.vn/v2/gateway/api/create",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  /* 5. MoMo trả lỗi? -> ném exception để controller 500 */
  if (+data.resultCode !== 0) {
    throw new Error(`MoMo error ${data.resultCode}: ${data.message}`);
  }

  return data; // payUrl, qrCodeUrl, deeplink...
};
