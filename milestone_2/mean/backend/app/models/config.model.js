const mongoose = require("mongoose");

const Config = mongoose.model(
  "Config",
  new mongoose.Schema({
    tokenAmount: Number,
    frequencyWeeks: Number
  })
);

module.exports = Config;