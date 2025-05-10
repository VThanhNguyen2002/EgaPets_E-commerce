const router      = require('express').Router();
const ctl         = require('./productController');
const imgCtl      = require('./productImage.controller');
const { verifyToken, requireRoles } = require('@middlewares/authMiddleware');
const { ROLES }   = require('@shared/constants');

/* ------ sản phẩm ------ */
router.get('/',      ctl.getAll);
router.get('/newest', ctl.getNewest);
router.get('/:id',   ctl.getById);
router.post('/',     verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.create);
router.put('/:id',   verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.update);

/* ------ ảnh sản phẩm ------ */
router.get('/:pid/images',            imgCtl.list);
router.post('/:pid/images',
            verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), imgCtl.create);
router.delete('/images/:id',
            verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), imgCtl.remove);

/* ---------- DETAIL BY ID ------------ */
router.get('/:id(\\d+)', ctl.getById);

module.exports = router;
