const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");

router.get("/phone", phoneController.apiGetAllPhoneService);
router.get("/brand", phoneController.apiGetBrandService);
router.get("/phoneinfo", phoneController.apiGetPhoneInfo);
router.get("/Soldout", phoneController.apiGetSoldOutService);
router.get("/Bestseller", phoneController.apiGetBestSellerService);
router.get("/Search", phoneController.apiGetSearchService);
router.get("/highestValue", phoneController.apiGetHighestValue);
router.get("/addreview", phoneController.apiAddReview);
router.get("/getreview", phoneController.apiGetReview);
router.get("/allreview", phoneController.apiGetAllReview);

module.exports = router;
