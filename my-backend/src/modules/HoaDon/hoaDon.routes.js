const router = require('express').Router();
const controller = require('../modules/HoaDon/hoaDon.controller');
const { verifyToken, requireRoles } = require('../../middlewares/authMiddleware');

router.get('/', verifyToken, requireRoles('Admin', 'NhanVien', 'KhachHang'), controller.getAll);
router.get('/:id', verifyToken, requireRoles('Admin', 'NhanVien', 'KhachHang'), controller.getById);
router.post('/', verifyToken, requireRoles('KhachHang'), controller.create);
router.put('/:id', verifyToken, requireRoles('Admin', 'NhanVien'), controller.update);
router.delete('/:id', verifyToken, requireRoles('Admin'), controller.remove);

module.exports = router;
