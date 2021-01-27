const mongoose = require("../../db.js");
var Schema = mongoose.Schema;

var user = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userPlan: String,
});

const Users = mongoose.model("users", user);

module.exports = Users;
