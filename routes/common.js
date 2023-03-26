const express = require(`express`);
const { check } = require("express-validator");

const commonController = require(`../controllers/common`);

const isAuth = require(`../middlewares/auth/is-auth`);

const router = express.Router();

router.get(`/info`, isAuth, commonController.info);

router.get(`/announcements`, isAuth, commonController.announcements);

router.post(
  `/edit-password`,
  [
    check("oldPassword", "Please enter your old password correctly")
      .trim()
      .notEmpty(),
    check("newPassword", "Please enter your new password correctly").matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/
    ),
  ],
  isAuth,
  commonController.editPassword
);

router.post(`/editPassword`, commonController.editPassword);

module.exports = router;
