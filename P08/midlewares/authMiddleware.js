const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Normalize and get the Authorization header
    const authHeader = req.headers["authorization"]; // Handles lowercase

    // Check if the Authorization header exists and follows the "Bearer <token>" format
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).send({
        success: false,
        message:
          "Authorization token missing or malformed. Use 'Bearer <token>' format.",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid or expired token.",
        });
      }

      // Attach user ID from decoded token to the request body
      req.body.id = decode.id;
      next();
    });
  } catch (error) {
    console.error("Error in Auth Middleware:", error);
    res.status(500).send({
      success: false,
      message: "Error in Auth Middleware",
      error,
    });
  }
};
