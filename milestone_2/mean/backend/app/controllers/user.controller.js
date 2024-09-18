const db = require("../models");
const Item = db.item;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  Item.find().then((items) => {
    res.status(200).send(items);
  }).catch((err) => {
    res.status(500).send({ message: err });
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.staffBoard = (req, res) => {
  res.status(200).send("Staff Content.");
};