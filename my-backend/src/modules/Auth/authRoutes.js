const express = require('express');
const router = express.Router();
const authController = require('../Auth/auth.controller');
const { verifyToken, requireRoles } = require('../../middlewares/authMiddleware');


// Đăng ký theo role
router.post('/register-customer', authController.registerCustomer);
router.post('/register-employee', authController.registerEmployee);

// Quên mật khẩu
router.post('/forgot-password',  authController.forgotPassword);
router.post('/reset-password',   authController.resetPassword);


// Đăng nhập
router.post('/login', authController.login);

// Route test quyền
router.get('/admin-only', verifyToken, requireRoles('Admin'), (req, res) => {
  res.json({ msg: 'Chỉ Admin mới vào được!' });
});

module.exports = router;
