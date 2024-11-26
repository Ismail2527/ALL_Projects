const userModel = require("../models/userModel");
module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(404).send({
        success: false,
        message: "You are not authorized to access this page",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in Auth Middleware:", error);
    res.status(500).send({
      success: false,
      message: "Error in Auth Middleware",
      error,
    });
  }
};
