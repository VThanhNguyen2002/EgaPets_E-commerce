// ✅ 3. src/modules/PaymentMethod/paymentMethod.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./paymentMethod.controller");

router.get("/", controller.getAllPaymentMethods);

module.exports = router;