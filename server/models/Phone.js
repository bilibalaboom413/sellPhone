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
      index: true,
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
        index: true,
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

PhoneSchema.index({ stock: 1, reviews: -1 });

var Phone = mongoose.model("Phone", PhoneSchema, "phonelisting");
module.exports = Phone;
