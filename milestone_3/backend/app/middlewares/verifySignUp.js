const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // Try find existing account with email
  User.findOne({
    email: req.body.email
  }).then((user) => {
    // Email in use, can't make a new account with it
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
    }
    next();
  }).catch((err) => {
    res.status(500).send({ message: err });
  });
};

checkDuplicateEmailUpdate = (req, res, next) => {
  console.log("Check email");

  // Try find existing account with email
  User.findOne({
    email: req.body.email
  }).then((user) => {
    console.log("User:", user, "User id:", user.id, "Req id:", req.body.id);
    if (user && user.id != req.body.id) {
      console.log("Check fail");
      res.status(400).send({ message: "Failed! Email is already in use!" });
    } else {
      next();
    }
  }).catch((err) => {
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkDuplicateEmailUpdate,
  checkRolesExisted
};

module.exports = verifySignUp;