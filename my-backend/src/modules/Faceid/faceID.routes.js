// src/routes/faceID.routes.js
const { Router } = require("express");
const {
  insertFaceIDViaPython,   // <‑‑ mới
  verifyFace
} = require('@modules/Faceid/faceIDController');
const { verifyToken, requireRoles } = require('../../middlewares/authMiddleware');

const router = Router();

// ① Dành riêng cho nhân viên (giống cũ)
router.post(
  '/register-face',
  verifyToken,
  requireRoles('NhanVien'),
  insertFaceIDViaPython
);

// ② Cửa “public” – chỉ cần đăng nhập (Customer, Admin… đều được)
router.post(
  '/register-face-public',
  verifyToken,             // có token nhưng KHÔNG check role
  insertFaceIDViaPython
);

// Verify chỉ cho Nhân Viên
router.post(
  '/verify-face',
  verifyToken,
  requireRoles('NhanVien'),
  verifyFace
);

module.exports = router;
