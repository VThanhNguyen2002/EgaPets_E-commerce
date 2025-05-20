const r   = require('express').Router();
const ctl = require('./payment.controller');

r.post('/momo',      ctl.createMomo);   // tạo QR
r.post('/momo/ipn',  ctl.ipnMomo);      // nhận IPN

module.exports = r;
