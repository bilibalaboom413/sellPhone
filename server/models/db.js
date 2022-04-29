require("dotenv").config();

const mongoose = require("mongoose");
const CONNECTION_URL = process.env.MONGO_URL;

mongoose.connect(
  CONNECTION_URL,
  { useNewUrlParser: true, useCreateIndex: true },
  function () {
    console.log("Mongodb connection established");
  }
);

module.exports = mongoose;