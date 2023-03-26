const Student = require(`../models/student`);
const Teacher = require(`../models/teacher`);
const Class = require(`../models/class`);
const Exam = require(`../models/exam`);
const codes = require(`http-status-codes`).StatusCodes;
const { validationResult } = require(`express-validator`);

exports.teacherWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { teacherId, classId } = req.body;
    const teacher = await Teacher.findOne({ prettyId: teacherId });
    const myClass = await Class.findOne({ prettyId: classId });
    if (!teacher || !myClass) {
      const error = new Error("Error finding teacher or class.");
      error.statusCode = 400;
      return next(error);
    }
    let ar1 = myClass.teachers.find((e) => {
      return e.prettyId == teacher.prettyId;
    });
    let ar2 = teacher.classes.find((e) => {
      return e.prettyId == myClass.prettyId;
    });
    if (ar1 || ar2) {
      const error = new Error("Connection already exists.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    teacher.classes.push({
      name: myClass.name,
      _id: myClass._id,
      prettyId: myClass.prettyId,
    });
    myClass.teachers.push({
      name: teacher.name,
      _id: teacher._id,
      prettyId: teacher.prettyId,
    });
    await teacher.save();
    await myClass.save();
    res.status(codes.ACCEPTED).json({
      message: "Connection created successfully.",
      teacher,
      class: myClass,
    });
  } catch {
    const error = new Error(`Error creating connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.deleteTeacherWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { teacherId, classId } = req.body;
    const teacher = await Teacher.findOne({ prettyId: teacherId });
    const myClass = await Class.findOne({ prettyId: classId });
    if (!teacher || !myClass) {
      const error = new Error("Error finding teacher or class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let filtered1 = teacher.classes.filter(
      (sClass) => sClass.prettyId != myClass.prettyId
    );

    teacher.classes = filtered1;

    let filtered2 = myClass.teachers.filter(
      (sTeacher) => sTeacher.prettyId != teacher.prettyId
    );
    myClass.teachers = filtered2;
    await myClass.save();
    await teacher.save();
    res.status(codes.ACCEPTED).json({
      message: "Connection deleted successfully.",
      teacher,
      class: myClass,
    });
  } catch {
    const error = new Error(`Error removing connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.studentWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { studentId, classId } = req.body;
    const student = await Student.findOne({ prettyId: studentId });
    const myClass = await Class.findOne({ prettyId: classId });
    if (!student || !myClass) {
      const error = new Error("Error finding student or class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let ar1 = myClass.students.find((e) => {
      return e.prettyId == student.prettyId;
    });
    if (ar1) {
      const error = new Error("Connection already exists.");
      error.statusCode = 400;
      return next(error);
    }
    student.class._id = myClass._id;
    student.class.prettyId = classId;
    student.class.name = myClass.name;
    await student.save();

    let a = myClass.students.push({
      name: student.name,
      prettyId: student.prettyId,
      _id: student._id,
    });

    await myClass.save();
    res.status(codes.ACCEPTED).json({
      message: "Connection created successfully.",
      student,
      class: myClass,
    });
  } catch {
    const error = new Error(`Error creating connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.deleteStudentWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { studentId } = req.body;
    const student = await Student.findOne({ prettyId: studentId });
    const myClass = await Class.findOne({ prettyId: student.class.prettyId });
    if (!student || !myClass) {
      const error = new Error("Error finding student or class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let filtered = myClass.students.filter(
      (student) => student.prettyId != studentId
    );

    myClass.students = filtered;
    student.class = {};
    await myClass.save();
    await student.save();
    res.status(codes.ACCEPTED).json({
      message: "Connection deleted successfully.",
      student,
      class: myClass,
    });
  } catch {
    const error = new Error(`Error removing connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.examWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { examId, classId } = req.body;
    const exam = await Exam.findOne({ prettyId: examId });
    const myClass = await Class.findOne({ prettyId: classId });

    if (!exam || !myClass) {
      const error = new Error("Error finding student or class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }

    let a = myClass.exams.map((e) => {
      if (e.prettyId == examId) return true;
    });
    if (a.includes(true)) {
      const error = new Error("Class already has this exam.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    myClass.exams.push({
      prettyId: exam.prettyId,
      _id: exam._id,
      subject: exam.subject,
      At: exam.At,
    });
    exam.classes.push({
      _id: myClass._id,
      prettyId: myClass.prettyId,
      name: myClass.name,
    });
    await exam.save();
    await myClass.save();
    res
      .status(codes.ACCEPTED)
      .json({
        message: "Connection created succesfully.",
        exam,
        class: myClass,
      });
  } catch {
    const error = new Error(`Error creating connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.deleteExamWithClass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { examId, classId } = req.body;
    const exam = await Exam.findOne({ prettyId: examId });
    const myClass = await Class.findOne({ prettyId: classId });
    if (!exam || !myClass) {
      const error = new Error("Error finding student or class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    myClass.exams = myClass.exams.filter((e) => e.prettyId != examId);
    Exam.deleteOne({ prettyId: examId });
    await myClass.save();
    res
      .status(codes.ACCEPTED)
      .json({ message: "Connection deleted succesfully." });
  } catch {
    const error = new Error(`Error deleting connection.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
