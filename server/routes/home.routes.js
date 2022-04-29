const express = require("express");
const router = express.Router();
const controller = require("../controllers/home.controller");

router.post("/transaction", controller.transactionConfirm);

module.exports = router;