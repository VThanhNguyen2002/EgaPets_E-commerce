// middlewares/optionalAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    // token sai → trả 401, tránh giả mạo
    return res.status(401).json({ error: 'Token không hợp lệ.' });
  }
  next();
};
