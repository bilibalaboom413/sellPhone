const { ObjectId } = require("mongodb");
const mongoose = require("./db");

const PhoneSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    seller: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    reviews: {
      reviewer: {
        type: String,
        required: false,
      },
      rating: {
        type: Number,
        required: false,
      },
      comment: {
        type: String,
        required: false,
      },
    },
    disabled: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

PhoneSchema.statics.findPhoneById = function (id, callback) {
  return this.find({ _id: id }).exec(callback);
};

// var Phone = mongoose.model("Phone", PhoneSchema, "phonelisting");
var Phone = mongoose.model("Phone", PhoneSchema, "phone");
module.exports = Phone;
