const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    organisation: String,
    tokens: Number,
    tokenExpiry: Date,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  })
);

module.exports = User;