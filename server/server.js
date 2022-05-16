const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

// Load .env
require("dotenv").config();

const checkoutRouter = require("./routes/checkout.routes");
const registerRouter = require("./routes/register.routes");
const loginRouter = require("./routes/login.routes");
const logoutRouter = require("./routes/logout.routes");
const authenticateRouter = require("./routes/authenticate.routes");
const resetRouter = require("./routes/reset.routes");
const resetpasswordRouter = require("./routes/resetpassword.routes");
const homepageRouter = require("./routes/homepage.routes");

const userpageRouter = require("./routes/userpage.routes");

const port = 8000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // Expired in an hour
      maxAge: 3600000,
    },
    unset: "destroy",
  })
);

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
//   res.header("X-Requested-With", "3.2.1");
//   res.header("Content-Type", "application/json;charset=tf-8");
//   next();
// });

app.use("/", homepageRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/authenticate", authenticateRouter);
app.use("/reset", resetRouter);
app.use("/resetpassword", resetpasswordRouter);
app.use("/checkout", checkoutRouter);
app.use("/user", userpageRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
