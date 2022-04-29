const mongoose = require('mongoose');
const bodyParser =  require("body-parser");
const express=require('express');
const PhoneController = require("./src/controller/phoneController");
const app = express();
const port = 8000;
const cors = require("cors");

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/local',
    { useNewUrlParser: true });

//body-parser config;
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/homepage.html");
})
app.get("/test",(req,res)=>{
    res.sendFile(__dirname + "/test.html");
})
app.get("/testApi",(req,res)=>{
    res.send("test")
})
app.get("/phone", PhoneController.apiGetAllPhoneService);
app.get("/brand", PhoneController.apiGetBrandService);
app.get("/phoneinfo",PhoneController.apiGetPhoneInfo);
app.get("/Soldout", PhoneController.apiGetSoldOutService);
app.get("/Bestseller", PhoneController.apiGetBestSellerService);
app.get("/Search", PhoneController.apiGetSearchService);
app.get("/highestValue", PhoneController.apiGetHighestValue);




app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
    res.header("X-Requested-With", '3.2.1');
    res.header("Content-Type", "application/json;charset=tf-8");
    next();
});
