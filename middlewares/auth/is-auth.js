const jwt = require("jsonwebtoken");
const codes = require(`http-status-codes`).StatusCodes;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = codes.UNAUTHORIZED;
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "af520c966d0ed699956c");
  } catch (err) {
    err.statusCode = codes.INTERNAL_SERVER_ERROR;
    return next(err);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = codes.UNAUTHORIZED;
    return next(error);
  }
  let user = {
    prettyId: decodedToken.prettyId,
    role: decodedToken.role,
  };
  req.userId = user.prettyId;
  req.role = user.role;
  next();
};
