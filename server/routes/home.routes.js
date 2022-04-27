const express = require("express");
const controller = require("../controllers/home.controller");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello world");
// });
// router.get("/show", controller.showCheckout);
router.post("/transaction", controller.transactionConfirm);

module.exports = router;
