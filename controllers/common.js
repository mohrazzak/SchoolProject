const bcrypt = require(`bcrypt`);
const codes = require(`http-status-codes`).StatusCodes;
const { validationResult } = require(`express-validator`);
const Student = require(`../models/student`);
const Admin = require(`../models/admin`);
const Teacher = require(`../models/teacher`);
const Announcement = require(`../models/announcement`);

//User information
exports.info = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const prettyId = req.userId;
    const role = req.role;
    let user;
    if (prettyId.length == 0) {
      const error = new Error(`Please insert an id.`);
      error.statusCode = codes.INTERNAL_SERVER_ERROR;
      return next(error);
    } else if (role == "student") {
      // student
      user = await Student.findOne({ prettyId: prettyId });
    } else if (role == "teacher") {
      // Teacher
      user = await Teacher.findOne({ prettyId: prettyId });
    } else {
      user = await Admin.findOne({ prettyId: prettyId });
    }
    res.status(codes.ACCEPTED).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch {
    const error = new Error(`Error fetching User.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

// my annoucments
exports.announcements = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const announcements = await Announcement.find().sort({ updatedAt: -1 });
    const customed = announcements.map((announcement) => {
      if (!announcement.image.startsWith("http")) {
        announcement.image =
          "https://e-school-syr.herokuapp.com/" + announcement.image;
      }
      return announcement;
    });
    res.json({
      message: "Announcement fetched successfully",
      announcements: customed,
    });
  } catch {
    const error = new Error(`Error fetching User.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

// edit my password
exports.editPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const prettyId = req.userId;
    const role = req.role;
    const { newPassword, oldPassword } = req.body;
    if (newPassword == oldPassword) {
      const error = new Error(`Change your password to new one`);
      error.statusCode = codes.INTERNAL_SERVER_ERROR;
      return next(error);
    }
    let user;
    if (prettyId.length == 0) {
      const error = new Error(`Please insert an id.`);
      error.statusCode = codes.INTERNAL_SERVER_ERROR;
      return next(error);
    } else if (role == "student") {
      // student
      user = await Student.findOne({ prettyId: prettyId });
    } else if (role == "teacher") {
      // Teacher
      user = await Teacher.findOne({ prettyId: prettyId });
    } else {
      user = await Admin.findOne({ prettyId: prettyId });
    }
    console.log(role == "student");
    if (!user) {
      const error = new Error(`User not found.`);
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let result = await bcrypt.compare(oldPassword, user.password);
    if (
      (!result && oldPassword != user.accessToken) ||
      (oldPassword == user.accessToken &&
        user.accessTokenExpiration < Date.now())
    ) {
      const error = new Error(`Password/ResetToken incorrect.`);
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res
      .status(codes.ACCEPTED)
      .json({ message: `Password changed successfully.` });
  } catch {
    const error = new Error(`Updating password failed.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
