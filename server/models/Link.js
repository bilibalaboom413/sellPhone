const { ObjectId } = require("mongodb");
const mongoose = require("./db");

const LinkSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Either be 'register' or 'reset'
    type: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

/**
 * Creates a link document in the database.
 */
LinkSchema.statics.createLink = function (data, callback) {
  return this.create(data, callback);
};

/**
 * Finds the particular register link document with provided email address
 * assuming at most one link document with one type exists in the
 * database. Returns null if not exists.
 */
LinkSchema.statics.findRegisterLinkByEmail = function (email, callback) {
  return this.findOne({ email: email, type: "register" }).exec(callback);
};

/**
 * Finds the particular reset link document with provided email address
 * assuming at most one link document with one type exists in the
 * database. Returns null if not exists.
 */
LinkSchema.statics.findResetLinkByEmail = function (email, callback) {
  return this.findOne({ email: email, type: "reset" }).exec(callback);
};

/**
 * Checks whether the provided id exists as a register link.
 */
LinkSchema.statics.checkRegisterIdExists = function (id, callback) {
  return this.exists({ _id: id, type: "register" }).exec(callback);
};

/**
 * Checks whether the provided id exists as a reset link.
 */
LinkSchema.statics.checkResetIdExists = function (id, callback) {
  return this.exists({ _id: id, type: "reset" }).exec(callback);
};

/**
 * Finds the particular register link document with provided id
 * assuming at most one link document with one type exists in the
 * database. Returns null if not exists.
 */
LinkSchema.statics.findRegisterLinkById = function (id, callback) {
  return this.findOne({ _id: id, type: "register" }).exec(callback);
};

/**
 * Finds the particular reset link document with provided id
 * assuming at most one link document with one type exists in the
 * database. Returns null if not exists.
 */
LinkSchema.statics.findResetLinkById = function (id, callback) {
  return this.findOne({ _id: id, type: "reset" }).exec(callback);
};

/**
 * Deletes the particular register link document with provided id.
 */
LinkSchema.statics.deleteRegisterLinkById = function (id, callback) {
  return this.deleteOne({ _id: id, type: "register" }).exec(callback);
};

/**
 * Deletes the particular register link document with provided id.
 */
LinkSchema.statics.deleteResetLinkById = function (id, callback) {
  return this.deleteOne({ _id: id, type: "reset" }).exec(callback);
};

var Link = mongoose.model("Link", LinkSchema, "link");
module.exports = Link;
