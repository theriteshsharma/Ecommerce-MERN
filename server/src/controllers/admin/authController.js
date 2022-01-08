const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user)
      res.status(400).json({
        message: "Admin allready exits",
      });
    else {
      const { firstName, lastName, email, password } = req.body;

      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        userName: shortid.generate(),
        role: "admin",
      });

      _user.save((err, data) => {
        if (err)
          res.status(500).json({
            message: "Something went Wrong",
          });
        else {
          res.status(201).json({
            message: "Admin successfully created!",
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) res.status(400).json({ message: err });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { expiresIn: "1h" });
        res.status(200).json({ token, user });
      } else {
        res.status(400).json({
          message: "Wrong Passoword",
        });
      }
    } else {
      res.status(400).json({
        message: "Admin Not Found",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout  Successfull",
  });
};
