const express = require(`express`);

const connect = require(`../controllers/connections`);
const isAuth = require(`../middlewares/auth/is-auth`);
const { check } = require("express-validator");

const router = express.Router();

router.post(
  `/connect-t-c`,
  isAuth,
  [
    check("teacherId", "Please enter a valid teacher ID")
      .notEmpty()
      .isNumeric(),
    check("classId", "Please enter a valid class ID").notEmpty().isNumeric(),
  ],
  connect.teacherWithClass
);

router.post(
  `/connect-s-c`,
  isAuth,
  [
    check("studentId", "Please enter a valid student ID")
      .notEmpty()
      .isNumeric(),
    check("classId", "Please enter a valid class ID").notEmpty().isNumeric(),
  ],
  connect.studentWithClass
);

router.post(`/connect-e-c`, isAuth, connect.examWithClass);

router.post(
  `/disconnect-t-c`,
  isAuth,
  [
    check("teacherId", "Please enter a valid teacher ID")
      .notEmpty()
      .isNumeric(),
    check("classId", "Please enter a valid class ID").notEmpty().isNumeric(),
  ],
  connect.deleteTeacherWithClass
);

router.post(
  `/disconnect-s-c`,
  isAuth,
  [
    check("classId", "Please enter a valid class ID").notEmpty().isNumeric(),
    check("studentId", "Please enter a valid student ID")
      .notEmpty()
      .isNumeric(),
  ],
  connect.deleteStudentWithClass
);


module.exports = router;
