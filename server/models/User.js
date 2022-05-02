const { ObjectId } = require("mongodb");
const mongoose = require("./db");

const UserSchema = new mongoose.Schema({
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
  passsword: {
    type: String,
    required: true,
  },
});

var User = mongoose.model("User", UserSchema, "userlist");
module.exports = User;
