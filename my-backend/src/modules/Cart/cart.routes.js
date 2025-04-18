const r               = require('express').Router();
const ctl             = require('@modules/Cart/cart.controller');
const { verifyToken } = require('@middlewares/authMiddleware');

r.post('/',          ctl.add);                 // guest hoặc logged‑in
r.get('/',           ctl.list);
r.put('/:id',        ctl.update);
r.delete('/:id',     ctl.remove);

r.get('/checkout/summary', verifyToken, ctl.summary);   // cần login trước thanh toán

module.exports = r;
