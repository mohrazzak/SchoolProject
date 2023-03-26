const express = require(`express`);

const teacherController = require(`../controllers/teacher`);

const isAuth = require(`../middlewares/auth/is-auth`);
const isTeacher = require(`../middlewares/auth/is-teacher`);

const router = express.Router();

router.get(`/program`, isAuth, isTeacher, teacherController.program);
router.get(`/classes`, isAuth, isTeacher, teacherController.classes);

module.exports = router;
