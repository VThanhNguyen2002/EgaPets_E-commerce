const router = require('express').Router();

router.use('/auth',    require('../modules/Auth/authRoutes'));
router.use('/face',    require('../modules/Faceid/faceID.routes'));
router.use('/product', require('../modules/Product/product.routes'));
router.use('/cart',    require('../modules/Cart/cart.routes'));
// thêm /order, /user … ở đây

module.exports = router;
