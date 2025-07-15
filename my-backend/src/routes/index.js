const router = require('express').Router();

// API Info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'EgaPets API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      services: '/api/services',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments',
      'payment-methods': '/api/payment-methods'
    }
  });
});

router.use('/auth',    require('../modules/Auth/authRoutes'));
router.use('/face',    require('../modules/Faceid/faceID.routes'));
router.use('/products', require('../modules/Product/product.routes'));
router.use('/categories', require('../modules/Category/category.routes'));
router.use('/services', require('../modules/Service/service.routes'));
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
