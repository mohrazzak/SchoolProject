const codes = require(`http-status-codes`).StatusCodes;
const Class = require(`../models/class`);
const Teacher = require(`../models/teacher`);

exports.program = async (req, res, next) => {
  try {
    const teacherId = req.userId;
    const teacher = await Teacher.findOne({ prettyIdent: teacherId });
    if (!teacher) {
      const error = new Error("Error finding teacher.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    res.status(codes.ACCEPTED).json({
      message: "Teacher program fetched successfully.",
      program: teacher.program,
    });
  } catch {
    const error = new Error(`Error fetching program.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
exports.classes = async (req, res, next) => {
  try {
    const teacherId = req.userId;
    const teacher = await Teacher.findOne({ prettyId: teacherId });
    if (!teacher) {
      const error = new Error("Error finding teacher.");
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let myAr = [];
    let result = {};
    for (let i = 0; i < teacher.classes.length; i++) {
      const mclass = await Class.findOne({
        prettyId: teacher.classes[i].prettyId,
      });
      result = {
        students: mclass.students,
        name: mclass.name,
        prettyId: mclass.prettyId,
      };
      myAr.push(result);
    }

    res.status(codes.ACCEPTED).json({
      message: "Teacher classes fetched successfully.",
      classes: myAr,
    });
  } catch {
    const error = new Error(`Error fetching program.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
