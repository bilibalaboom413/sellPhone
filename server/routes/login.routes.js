const express = require("express");
const controller = require("../controllers/sign.controller");
const router = express.Router();

router.post("/", controller.login);

module.exports = router;
