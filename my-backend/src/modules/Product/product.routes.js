const router = require('express').Router();
const ctl    = require('@modules/Product/productController');
const { verifyToken, requireRoles } = require('@middlewares/authMiddleware');
const { ROLES } = require('@shared/constants');

router.get('/',        ctl.getAll);
router.get('/:id',     ctl.getById);
router.post('/',       verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.create);
router.put('/:id',     verifyToken, requireRoles(ROLES.EMPLOYEE, ROLES.ADMIN), ctl.update);

module.exports = router;
