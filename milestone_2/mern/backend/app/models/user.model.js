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
    },
    purchases: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }]
  })
);

module.exports = User;