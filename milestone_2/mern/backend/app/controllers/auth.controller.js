const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    organisation: req.body.organisation,
    tokens: 100,
    tokenExpiry: Date("2024-12-31"),
  });

  user.save().then((user) => {
    console.log("CONTROLLER");
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            console.log("Error 1:", err);
            res.status(500).send({ message: err });
            return;
          }
          user.role = roles.map(role => role._id);
          user.save().then(() => {
            res.send({ message: "User was registered successfully!" });
          }).catch(err => {
            if (err) {
              console.log("Error 2:", err);
              res.status(500).send({ message: err });
              return;
            }
          });
        }
      );
    } else {
      Role.findOne({ name: "beneficiary" }).then((role) => {
        user.role = role._id;
        user.save().then(() => {
          res.send({ message: "User was registered successfully!" });
        }).catch(err => {
          if (err) {
            console.log("Error 3:", err);
            res.status(500).send({ message: err });
            return;
          }
        });
      }).catch((err) => {
        if (err) {
          console.log("Error 4 :", err);
          res.status(500).send({ message: err });
          return;
        }
      });
    }
  }).catch((err) => {
    if (err) {
      console.log("Error 5:", err);
      res.status(500).send({ message: err });
      return;
    }
  });
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email
  }).populate('role', '-__v').populate('purchases', '-__v').then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            });

    var authorities = [];
    authorities.push("role_" + user.role.name.toLowerCase());

    var purchaseList = [];
    user.purchases.forEach(purchase => {
      purchaseList.push("" + purchase.name.toLowerCase());
    });
    
    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organisation: user.organisation,
      tokens: user.tokens,
      tokenExpiry: user.tokenExpiry,
      role: authorities[0],
      accessToken: token,
      purchases: purchaseList
    });
  }).catch((err) => {
    if (err) {
      console.log("Error 6:", err);
      res.status(500).send({ message: err });
      return;
    }
  });
};

exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};