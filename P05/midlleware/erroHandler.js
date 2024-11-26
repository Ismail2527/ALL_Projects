const { constats } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constats.VALIDATION_ERROR:
      res.json({
        title: "Not Found",
        message: err.message,
        statusTrace: err.stack,
      });
    case constats.NOT_FOUND:
      res.json({
        title: "Validation Failed",
        message: err.message,
        statusTrace: err.stack,
      });
    case constats.UNAUTHORIZED:
      res.json({
        title: "In Unauthorized",
        message: err.message,
        statusTrace: err.stack,
      });
    case constats.FORBIDDEN:
      res.json({
        title: "Forbidden Area",
        message: err.message,
        statusTrace: err.stack,
      });
    case constats.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        statusTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = errorHandler;
