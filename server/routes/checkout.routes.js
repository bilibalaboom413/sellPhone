const express = require("express");
const router = express.Router();
const controller = require("../controllers/checkout.controller");

router.post("/transaction", controller.transactionConfirm);

module.exports = router;
