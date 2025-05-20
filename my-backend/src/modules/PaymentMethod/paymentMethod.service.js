// src/modules/PaymentMethod/paymentMethod.service.js
const { query } = require("../../shared/db/sql");

exports.fetchAll = () =>
  query("SELECT id, ten_phuong_thuc FROM PhuongThucThanhToan");
