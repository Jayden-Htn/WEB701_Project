const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    Role.find({_id: { $in: user.role }}).then((role) => {
        for (let i = 0; i < role.length; i++) {
          if (role[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    ).catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
  }).catch((err) => {
    res.status(500).send({ message: err });
    return;
  });
};

isStaff = (req, res, next) => {
  User.findById(req.userId).then((user) => {
    Role.find({_id: { $in: user.role }}).then((role) => {
        for (let i = 0; i < role.length; i++) {
          if (role[i].name === "staff") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Staff Role!" });
        return;
      }
    ).catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
  }).catch((err) => {
    res.status(500).send({ message: err });
    return;
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isStaff
};
module.exports = authJwt;