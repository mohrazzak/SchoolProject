const { check, validationResult, header } = require("express-validator");

exports.validateUserLogin = [
  check(`prettyId`, `Please type a valid prettyId.`)
    .notEmpty()
    .isNumeric()
    .withMessage("ID must only contain numbers."),
  check(`password`, `Please type a valid password.`)
    .notEmpty()
    .isLength({
      min: 5,
      max: 16,
    })
    .withMessage("Password must be [5-16] charecter.")
];
