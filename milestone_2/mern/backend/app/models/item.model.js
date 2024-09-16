const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantityAvailable: Number,
    category: String
  })
);

module.exports = Item;