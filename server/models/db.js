require("dotenv").config();

const mongoose = require("mongoose");
const CONNECTION_URL = process.env.MONGO_URL;

mongoose.connect(CONNECTION_URL, function() {
    console.log("Mongodb connection established")
});

module.exports = mongoose
  