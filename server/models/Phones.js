const mongoose = require("mongoose");
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

phoneSchema.statics.findPhoneById = function (id, callback) {
  return this.find({ _id: id }).exec(callback);
};

module.exports = Phone = mongoose.model("Phone", phoneSchema, "phones");
