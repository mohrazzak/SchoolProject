const { check, validationResult, header } = require("express-validator");

exports.validateUserModel = [
  check(`password`, `Please type a valid password.`)
    .notEmpty()
    .isLength({
      min: 5,
      max: 16,
    })
    .withMessage("Password must be [5-16] charecter.")
    .isAlphanumeric()
    .withMessage("Password should contain both letters and numbers."),
  check(`name`, `Please type a valid name.`)
    .notEmpty()
    .withMessage("Name must not be empty.")
    .isAlpha()
    .withMessage("Name must only be letters"),
];
