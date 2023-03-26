const { check, validationResult, header } = require("express-validator");

exports.validateUserClassModel = [
  check(`name`, `Please type a valid name.`)
    .notEmpty()
    .withMessage("Name must not be empty.")
];
