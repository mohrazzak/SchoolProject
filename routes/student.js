const express = require(`express`);

const studentController = require(`../controllers/student`);

const isAuth = require(`../middlewares/auth/is-auth`);

const router = express.Router();

router.get(`/friends`, isAuth, studentController.friends);

router.get(`/teachers`, isAuth, studentController.teachers);

router.get(`/exams`, isAuth, studentController.exams);

router.get(`/marks`, isAuth, studentController.marks);

router.get(`/program`, isAuth, studentController.program);


module.exports = router;
