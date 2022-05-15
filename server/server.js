const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const checkoutRouter = require("./routes/checkout.routes");
const registerRouter = require("./routes/register.routes");
const resetRouter = require("./routes/reset.routes");
const resetpasswordRouter = require("./routes/resetpassword.routes");
const homepageRouter = require("./routes/homepage.routes");

const port = 8000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

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
app.use("/reset", resetRouter);
app.use("/resetpassword", resetpasswordRouter);
app.use("/checkout", checkoutRouter);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = app;
