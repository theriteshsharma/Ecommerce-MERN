const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is requried"),
  check("email").notEmpty().withMessage("Invalid Email"),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Passowrd too short"),
];

exports.validateSigninRequest = [
  check("email").notEmpty().withMessage("Invalid Email"),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password to Short"),
];

exports.isRequestValidated = (req, res, next) => {
  errors = validationResult(req);
  if (errors.array().length > 0) {
    res.status(400).json({
      error: errors.array()[0].msg,
    });
  } else next();
};
