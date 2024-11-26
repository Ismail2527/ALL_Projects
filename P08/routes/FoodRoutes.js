const express = require("express");

const authMiddleware = require("../midlewares/authMiddleware");
const {
  createFoodController,
  getallFoodController,
  getOneFoodController,
  getfoodByResturantController,
  updateFoodByResturantController,
  deleteFoodByResturantController,
  placeOrderController,
} = require("../controllers/foodController");

const router = express.Router();

// routes/
//CREATE
router.post("/create", authMiddleware, createFoodController);
//GET ALL
router.get("/getall", authMiddleware, getallFoodController);
//GET ONE
router.get("/getone/:id", authMiddleware, getOneFoodController);
//GET BY RESTURANT
router.get("/getbyresturant/:id", getfoodByResturantController);
//UPDATE FOOD
router.put("/update/:id", updateFoodByResturantController);
//DELETE FOOD
router.delete("/delete/:id", deleteFoodByResturantController);
// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);
module.exports = router;
