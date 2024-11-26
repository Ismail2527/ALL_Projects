const express = require("express");
const {
  loginUser,
  RegisterUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../midlleware/ValidateTokenHandler");

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
