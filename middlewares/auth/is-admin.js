module.exports = (req, res, next) => {
  if (req.role == "admin") return next();
  const error = new Error("Not Authuorized.");
  error.statusCode = 401;
  return next(error);
};
