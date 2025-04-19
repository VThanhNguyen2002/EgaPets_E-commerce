// middlewares/guestLimit.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 60 * 1000,     // 1 giờ
  max: 30,                       // 30 request
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !!req.user      // bỏ qua nếu đã login
});
