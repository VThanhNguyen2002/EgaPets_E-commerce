const r = require('express').Router();
const ctl = require('./customer.controller');
const { verifyToken, requireRoles } = require('@middlewares/authMiddleware');

r.get   ('/me',      verifyToken, requireRoles('KhachHang'), ctl.getMe);
r.put   ('/me',      verifyToken, requireRoles('KhachHang'), ctl.updateMe);

module.exports = r;
