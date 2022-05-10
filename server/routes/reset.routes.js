const express = require("express");
const controller = require("../controllers/sign.controller");
const router = express.Router();

router.post("/", controller.reset);
router.post("/:id", controller.reset2);

module.exports = router;
