const express = require(`express`);

const authController = require(`../controllers/auth`);

const login = require(`../middlewares/validators/login`).validateUserLogin;

const router = express.Router();

router.post(`/login`, login, authController.logIn);

router.post(`/accessLogin`, authController.accessLogin);

router.post(`/generateToken`, authController.generateToken);


module.exports = router;
