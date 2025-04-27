const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('@shared/db/sql');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();    // Không có token => cho qua (guest)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Nếu role là KhachHang thì gắn luôn khachHangId vào req.user
    if (req.user.role?.toLowerCase() === 'khachhang') {
      const pool = await poolPromise;
      const rs = await pool.request()
        .input('uid', sql.Int, req.user.id)
        .query('SELECT id FROM KhachHang WHERE user_id = @uid');

      req.user.khachHangId = rs.recordset[0]?.id || null;
      if (!req.user.khachHangId) {
        return res.status(403).json({ error: 'Không tìm thấy tài khoản khách hàng.' });
      }
    }
    
    next();
  } catch (e) {
    console.error('[OptionalAuth]', e.message);
    return res.status(401).json({ error: 'Token không hợp lệ.' });
  }
};
