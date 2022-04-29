const express = require("express");
const controller = require("../controllers/home.controller");
const router = express.Router();

router.post("/transaction", controller.transactionConfirm);

module.exports = router;
