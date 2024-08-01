const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");

const authMiddlewareAdmin = async (req, res, next) => {
  // Taking token from headers
  const authHeader = req.headers.authorization;

  const role = await jwtDecode(authHeader).user.roles;


  // Checking if token is null or undefined also checking the role
  if (authHeader === null || authHeader === undefined || role == 0) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }


  // Splitting token
  const token = authHeader.split(" ")[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  });
};

const authMiddleware = (req, res, next) => {
  // Taking token from headers
  const authHeader = req.headers.authorization;

  // Checking if token is null or undefined
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }



  // Splitting token
  const token = authHeader.split(" ")[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  });
};
module.exports = { authMiddleware, authMiddlewareAdmin };
