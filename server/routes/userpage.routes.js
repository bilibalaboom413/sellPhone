const express = require("express");
const router = express.Router();
const UserPage = require("../controllers/userPage.Controller");

router.get("/userPage", UserPage.apiGetUserInfo);
router.post("/updateUserPage", UserPage.apiSetUserInfo);
router.post("/setPassword", UserPage.apiSetPassword);
router.post("/addList", UserPage.apiAddList);
router.post("/userPhone", UserPage.apigetPhoneInfo);
router.post("/deletePhone", UserPage.apideletePhone);
router.post("/enable", UserPage.apiEnable);
router.post("/disable", UserPage.apiDisable);

module.exports = router;
