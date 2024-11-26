const express = require("express");

const authMiddleware = require("../midlewares/authMiddleware");
const {
  createCategoryController,
  getallCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

// routes/
// CREATE CATEGORY
router.post("/create", authMiddleware, createCategoryController);

// GET ALL
router.get("/getall", getallCategoryController);

//UPDATE CATEGORY
router.put("/update/:id", authMiddleware, updateCategoryController);

//DELETE CATEGORY
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
