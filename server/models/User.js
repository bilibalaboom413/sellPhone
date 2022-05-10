const { ObjectId } = require("mongodb");
const mongoose = require("./db");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
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
  },
  {
    versionKey: false,
  }
);

/**
 * Checks whether the provided email address exists.
 */
UserSchema.statics.checkEmailExists = function (email, callback) {
  return this.exists({ email: email }).exec(callback);
};

/**
 * Finds the particular user with provided email address assuming the email
 * stored in the database is always unique.
 */
UserSchema.statics.findUserByEmail = function (email, callback) {
  return this.findOne({ email: email }).exec(callback);
};

/**
 * Creates a user document in the database.
 */
UserSchema.statics.createUser = function (data, callback) {
  return this.create(data, callback);
};

/**
 * Changes the password of a user with provided email address.
 * data: { email: "email@address", password: "md5 hash" }
 */
UserSchema.statics.changePassword = function (data, callback) {
  return this.updateOne(
    { email: data.email },
    { password: data.password }
  ).exec(callback);
};

var User = mongoose.model("User", UserSchema, "userlist");
module.exports = User;
