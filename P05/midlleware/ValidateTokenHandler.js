const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "User is not authorized" });
        return;
      }
      req.user = decoded.user;
      next();
    });
  }

  // Handle cases where the token is missing
  if (!token) {
    res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
});

module.exports = validateToken;
