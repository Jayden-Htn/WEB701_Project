const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.item = require("./item.model");
db.category = require("./category.model");
db.config = require("./config.model");

module.exports = db;