const express = require("express");
const controller = require("../controllers/sign.controller");
const router = express.Router();

router.get("/", controller.authenticate);

module.exports = router;
