const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id:{
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

module.exports = User = mongoose.model("User", userSchema,'user');
