const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/home.routes");

// Load .env
require("dotenv").config();

const app = express();
const CONNECTION_URL = process.env.MONGO_URL;
const port = 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/checkout", router);

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(port, () => console.log(`Server Running on Port: ${port}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

// app.listen(port, () => {
//   console.log(`Listening on Port ${port}`);
// });

// Routes
// app.get("/helloworld", (req, res) => {
//   res.send({ express: "Your express backend is connected to react." });
// });

// module.exports = app;