const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const Student = require(`../models/student`);
const Admin = require(`../models/admin`);
const Teacher = require(`../models/teacher`);
const Class = require(`../models/class`);
const crypto = require(`crypto`);
const codes = require(`http-status-codes`).StatusCodes;
const { validationResult } = require(`express-validator`);

exports.logIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { prettyId, password } = req.body;
    let user;
    if (prettyId.toString().length == 4) {
      user = await Student.findOne({ prettyId: prettyId });
    } else if (prettyId.toString().length == 3) {
      user = await Teacher.findOne({ prettyId: prettyId });
    } else {
      user = await Admin.findOne({ prettyId: prettyId });
    }
    if (!user) {
      const error = new Error(`Error finding user.`);
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res
        .status(codes.UNAUTHORIZED)
        .json({ message: `Password incorrect.` });
    }
    const token = jwt.sign(
      {
        prettyId: user.prettyId,
        name: user.name,
        _id: user._id,
        role: user.role,
      },
      `af520c966d0ed699956c`,
      { expiresIn: `30d` }
    );
    res.status(codes.ACCEPTED).json({
      message: "User signed in successfully.",
      prettyId: user.prettyId,
      token: token,
      _id: user._id,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    const error = new Error(`Error Logining in.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.accessLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { prettyId, accessToken } = req.body;
    let user;
    if (prettyId.toString().length == 4) {
      user = await Student.findOne({ prettyId: prettyId });
    } else if (prettyId.toString().length == 3) {
      user = await Teacher.findOne({ prettyId: prettyId });
    } else {
      user = await Admin.findOne({ prettyId: prettyId });
    }
    if (!user) {
      const error = new Error(`Error finding user.`);
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    let result = false;
    if (
      accessToken == user.accessToken &&
      user.accessTokenExpiration > Date.now()
    ) {
      result = true;
    }
    if (!result) {
      return res
        .status(codes.UNAUTHORIZED)
        .json({ message: `AcessToken invalid successfully.` });
    }
    const token = jwt.sign(
      {
        prettyId: user.prettyId,
        name: user.name,
        _id: user._id,
        role: user.role,
      },
      `af520c966d0ed699956c`,
      { expiresIn: `30d` }
    );
    res.status(codes.ACCEPTED).json({
      message: "User signed in.",
      prettyId: user.prettyId,
      token: token,
      _id: user._id,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    const error = new Error(`Error Logining in.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};

exports.generateToken = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  try {
    const { prettyId } = req.body;
    let user;
    if (prettyId.toString().length == 4) {
      user = await Student.findOne({ prettyId: prettyId });
    } else if (prettyId.toString().length == 3) {
      user = await Teacher.findOne({ prettyId: prettyId });
    } else {
      user = await Admin.findOne({ prettyId: prettyId });
    }
    if (!user) {
      const error = new Error(`Error finding user.`);
      error.statusCode = codes.BAD_REQUEST;
      return next(error);
    }
    user.accessToken = crypto.randomBytes(8).toString("hex");
    user.accessTokenExpiration = Date.now() + 97200000;
    await user.save();
    res.status(codes.ACCEPTED).json({
      message: "Access token generated successfully.",
      prettyId: user.prettyId,
      accessToken: user.accessToken,
      accessTokenExpiration: user.accessTokenExpiration,
      _id: user._id,
      role: user.role,
      name: user.name,
    });
  } catch {
    const error = new Error(`Error generating new accessToken.`);
    error.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(error);
  }
};
