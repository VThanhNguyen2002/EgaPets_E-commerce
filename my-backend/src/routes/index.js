const router = require('express').Router();

router.use('/auth',    require('../modules/Auth/authRoutes'));
router.use('/face',    require('../modules/Faceid/faceID.routes'));
router.use('/product', require('../modules/Product/product.routes'));
router.use('/cart',    require('../modules/Cart/cart.routes'));

router.use("/orders", require("../modules/Order/order.routes"));
router.post("/orders/checkout", require("@modules/Order/order.controller").checkout);

router.use('/payment-methods', require('../modules/PaymentMethod/paymentMethod.routes'));
router.use('/payments', require('../modules/Payment/payment.routes'));

router.use('customers', require('@modules/Customer/customer.routes'));

// router.use('/users', require('../modules/User/user.routes'));
// router.use('/khachhang', require('../modules/KhachHang/khachHang.routes'));
// router.use('/nhanvien', require('../modules/NhanVien/nhanVien.routes'));
// router.use('/lichsu', require('../modules/LichSuSanPham/lichSu.routes'));
// router.use('/dichvu', require('../modules/DichVu/dichVu.routes'));


module.exports = router;
