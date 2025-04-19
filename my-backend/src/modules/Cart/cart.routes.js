const router        = require('express').Router();
const ctl           = require('@modules/Cart/cart.controller');
const optionalAuth  = require('@middlewares/optionalAuth');
const guestLimit    = require('@middlewares/guestLimit');

router.use(optionalAuth);      // tất cả request đọc token (nếu có)
router.use(guestLimit);        // áp dụng limit cho guest

router.post('/',    ctl.add);          // token không bắt buộc
router.get('/',     ctl.list);
router.put('/:id',  ctl.update);
router.delete('/:id', ctl.remove);

router.get('/checkout/summary',       // riêng checkout phải login
  (req, res, next) => req.user ? next()
                               : res.status(401).json({ error: 'Cần đăng nhập.' }),
  ctl.summary
);

module.exports = router;
