const express = require("express");
const controller = require("../controllers/sign.controller");
const router = express.Router();

router.post("/", controller.register);
router.post("/:id", controller.activate);

module.exports = router;
