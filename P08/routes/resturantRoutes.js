const express = require("express");

const authMiddleware = require("../midlewares/authMiddleware");
const {
  createResturantController,
  getallResturantController,
  getOneResturantController,
  deleteResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
// CREATE RESTURANT
router.post("/create", authMiddleware, createResturantController);
//  GET ALL RESTURANTS
router.get("/getall", getallResturantController);

// GET RESTURANT BY ID
router.get("/getOne/:id", getOneResturantController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
