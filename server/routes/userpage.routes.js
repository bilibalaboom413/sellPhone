/* var express = require('express');
const UserPage = require('../controllers/userPage.Controller');
var app = express();
const bodyParser =  require("body-parser");



const cors = require("cors");

const testDb = require('../models/User');

const mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost/27017'); //连接到mongoDB的todo数据库

const db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('连接成功!');
});


//设置bodyParser
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());




app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




//供前端调用的接口
app.get('/userPage',UserPage.apiGetUserInfo);
app.post('/updateUserPage',UserPage.apiSetUserInfo);
app.post('/setPassword',UserPage.apiSetPassword);
app.post('/addList',UserPage.apiAddList);
app.post('/userPhone',UserPage.apigetPhoneInfo);
app.post('/deletePhone',UserPage.apideletePhone);
app.post('/getComments',UserPage.apigetComments);
app.post('/getReviewers',UserPage.apiGetReviewerInfo);




//跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});







module.exports = app;








 */