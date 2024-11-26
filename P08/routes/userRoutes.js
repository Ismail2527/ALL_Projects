const express = require("express");
const {
  getUserController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../midlewares/authMiddleware");

const router = express.Router();

//routes
// Get User || GET
router.get("/getUser", authMiddleware, getUserController);

//Update Profile
router.put("/updateUser", authMiddleware, updateUserController);

//Update Password
router.post("/updatePassword", authMiddleware, updateUserPasswordController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

// DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
