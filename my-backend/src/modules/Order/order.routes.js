const r = require("express").Router();
const ctl = require("./order.controller");

r.post ("/checkout",                  ctl.checkout);
r.get  ("/:id/payment-status",        ctl.getPayStatus);

module.exports = r;
