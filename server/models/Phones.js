const mongoose = require("./db");
const Schema = mongoose.Schema;

const phoneSchema = Schema({
  title: String,
  brand: String,
  image: String,
  stock: Number,
  seller: String,
  price: Number,
  reviews: Array,
});

module.exports = Phone = mongoose.model("Phone", phoneSchema, "phones");
