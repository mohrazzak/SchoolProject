const express = require(`express`);
const multer = require(`multer`);

const adminController = require(`../controllers/admin`);

const isAuth = require(`../middlewares/auth/is-auth`);
const isAdmin = require(`../middlewares/auth/is-admin`);
const router = express.Router();
const { check } = require("express-validator");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/announcement");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + `-` + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// add annoucment
router.post(
  `/add/announcement`,
  isAuth,
  isAdmin,
  upload.single("image"),
  adminController.addAnnouncement
);

// delete annoucment
router.delete(
  `/delete/announcement`,
  isAuth,
  isAdmin,
  [check(`prettyId`, "Please fill the id correctly.").notEmpty().isNumeric()],
  adminController.deleteAnnouncement
);

// add student program
router.post(
  `/add/student-program`,
  isAuth,
  isAdmin,
  [check(`prettyId`, "Please fill the id correctly.").notEmpty().isNumeric()],
  adminController.addStudentProgram
);

// edit student program
router.put(
  `/edit/student-program`,
  isAuth,
  isAdmin,
  [
    check(`thursday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`monday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`tuesday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`wednesday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`friday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`prettyId`, "Please fill the id correctly.").notEmpty().isNumeric(),
  ],
  adminController.editStudentProgram
);

// add teacher program
router.post(
  `/add/teacher-program`,
  isAuth,
  isAdmin,
  [check(`prettyId`, "Please fill the id correctly.").notEmpty().isNumeric()],
  adminController.addTeacherProgram
);

// edit teacher program
router.put(
  `/edit/teacher-program`,
  isAuth,
  isAdmin,
  [
    check(`thursday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`monday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`tuesday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`wednesday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`friday`, "Please fill the day correctly.").notEmpty().isAlpha(),
    check(`prettyId`, "Please fill the id correctly.").notEmpty().isNumeric(),
  ],
  adminController.editTeacherProgram
);

router.post(
  `/add/exam`,
  isAuth,
  isAdmin,
  [
    check(`subject`, "Please provide valid subject").notEmpty().isAlpha(),
    check("fullMark", `Please provide valid mark`).notEmpty().isNumeric(),
  ],
  adminController.addExam
);

router.put(
  `/edit/exam`,
  isAuth,
  isAdmin,
  [
    check(`subject`, "Please provide valid subject").notEmpty().isAlpha(),
    check("fullMark", `Please provide valid mark`).notEmpty().isNumeric(),
  ],
  adminController.editExam
);

router.delete(
  `/delete/exam`,
  isAuth,
  isAdmin,
  [check(`prettyId`, "Please provide valid exam id.").notEmpty().isNumeric()],
  adminController.deleteExam
);

router.post(
  `/add/mark`,
  isAuth,
  isAdmin,
  [
    check(`studentId`, "Please provide valid student id.")
      .notEmpty()
      .isNumeric(),
    check(`examId`, "Please provide valid exam id.").notEmpty().isNumeric(),
    check(`mark`, "Please provide valid mark id.").notEmpty().isNumeric(),
  ],
  adminController.addMark
);

router.put(
  `/edit/mark`,
  isAuth,
  isAdmin,
  [
    check(`studentId`, "Please provide valid student id.")
      .notEmpty()
      .isNumeric(),
    check(`examId`, "Please provide valid exam id.").notEmpty().isNumeric(),
    check(`mark`, "Please provide valid mark id.").notEmpty().isNumeric(),
  ],
  adminController.editMark
);

router.delete(
  `/delete/mark`,
  isAuth,
  isAdmin,
  [
    check(`studentId`, "Please provide valid student id.")
      .notEmpty()
      .isNumeric(),
    check(`examId`, "Please provide valid exam id.").notEmpty().isNumeric(),
  ],
  adminController.deleteMark
);

// Users

router.post(
  `/add/student`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
  ],
  adminController.addStudent
);

router.put(
  `/edit/student`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty().isAlpha(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
  ],
  adminController.editStudent
);

// delete student
router.delete(
  `/delete/user`,
  isAuth,
  isAdmin,
  check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),

  adminController.deleteUser
);

//

router.post(
  `/add/teacher`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
  ],
  adminController.addTeacher
);

router.put(
  `/edit/teacher`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty().isAlpha(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
    check(`classes`, "Please provide valid classes.").notEmpty().isArray(),
  ],
  adminController.editTeacher
);

//

router.post(
  `/add/admin`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty().isAlpha(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),

    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
  ],
  adminController.addAdmin
);

router.put(
  `/edit/admin`,
  isAuth,
  isAdmin,
  [
    check(`password`, `Please type a valid password.`).notEmpty().isLength({
      min: 5,
      max: 16,
    }),
    check(`name`, "Please provide valid name.").notEmpty().isAlpha(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
    check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
  ],
  adminController.editAdmin
);

router.post(
  `/add/class`,
  isAuth,
  isAdmin,
  [check(`name`, "Please provide valid name.").notEmpty()],
  adminController.addClass
);

router.delete(
  `/delete/class`,
  isAuth,
  isAdmin,
  [check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric()],
  adminController.deleteClass
);
// fetch

router.get(`/all/students`, isAuth, isAdmin, adminController.allStudents);

router.get(`/all/teachers`, isAuth, isAdmin, adminController.allTeachers);

router.get(`/all/admins`, isAuth, isAdmin, adminController.allAdmins);

router.get(`/all/exams`, isAuth, isAdmin, adminController.allExams);

router.get(`/all/classses`, isAuth, isAdmin, adminController.allClasses);

router.post(
  `/get/student/marks`,
  isAuth,
  isAdmin,
  [check(`studentId`, "Please provide valid id.").notEmpty().isNumeric()],
  adminController.marks
);

router.post(
  `/info`,
  isAuth,
  isAdmin,
  check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
  adminController.userInfo
);
router.put(
  `/info`,
  isAuth,
  isAdmin,
  [
    check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
    check(`name`, "Please provide valid name.").notEmpty(),
    check(`gender`, "Please provide valid gender.").notEmpty().isAlpha(),
    check(`place`, "Please provide valid place.").notEmpty().isAlpha(),
    check(`email`, "Please provide valid email.")
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check(`phone`, "Please provide valid phone.").notEmpty().isNumeric(),
    check(`day`, "Please provide valid day.").notEmpty().isNumeric(),
    check(`month`, "Please provide valid month.").notEmpty().isNumeric(),
    check(`year`, "Please provide valid year.").notEmpty().isNumeric(),
  ],
  adminController.editUserInfo
);

router.post(
  "/class/program",
  isAuth,
  isAdmin,
  check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
  adminController.classProgram
);

router.post(
  "/teacher/program",
  isAuth,
  isAdmin,
  check(`prettyId`, "Please provide valid id.").notEmpty().isNumeric(),
  adminController.teacherProgram
);

module.exports = router;
