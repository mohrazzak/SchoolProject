const codes = require(`http-status-codes`).StatusCodes;
const Student = require(`../models/student`);
const Class = require(`../models/class`);

// my friends
exports.friends = async (req, res, next) => {
  try {
    const studentId = req.userId;
    const student = await Student.findOne({ prettyId: studentId });

    const myClass = await Class.findOne({ prettyId: student.class.prettyId });
    if (!myClass || !student) {
      const error = new Error("Error finding class or student.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    res.status(codes.ACCEPTED).json({
      message: "Students fetched successfully.",
      students: myClass.students.filter(
        (student) => student.prettyId != studentId
      ),
    });
  } catch {
    const error = new Error(`Error fetching students.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

// my teachers
exports.teachers = async (req, res, next) => {
  try {
    const studentId = req.userId;
    const student = await Student.findOne({ prettyId: studentId });
    const myClass = await Class.findOne({ prettyId: student.class.prettyId });
    if (!myClass) {
      const error = new Error("Error finding class.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    res.status(codes.ACCEPTED).json({
      message: "Class teachers fetched successfully.",
      teachers: myClass.teachers,
    });
  } catch {
    const error = new Error(`Error fetching teachers.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
//my Exams
exports.exams = async (req, res, next) => {
  try {
    const studentId = req.userId;
    const student = await Student.findOne({ prettyId: studentId });
    const myClass = await Class.findOne({ prettyId: student.class.prettyId });
    res.status(codes.ACCEPTED).json({
      message: "Exams fetched successfully.",
      exams: myClass.exams,
    });
  } catch {
    const error = new Error(`Error fetching exams.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

// my marks

exports.marks = async (req, res, next) => {
  try {
    const studentId = req.userId;
    const student = await Student.findOne({ prettyId: studentId });
    console.log(
      student.marks.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
    );
    res.status(codes.ACCEPTED).json({
      message: "Marks fetched successfully.",
      marks: student.marks,
    });
  } catch {
    const error = new Error(`Error fetching marks.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

//my program
exports.program = async (req, res, next) => {
  try {
    const studentId = req.userId;
    const student = await Student.findOne({ prettyId: studentId });
    const myClass = await Class.findOne({ prettyId: student.class.prettyId });
    res.json({
      message: "Student program fetched succesfully.",
      program: myClass.program,
    });
  } catch {
    const error = new Error(`Error fetching Program.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
