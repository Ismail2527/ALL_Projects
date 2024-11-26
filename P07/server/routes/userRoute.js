const express = require("express");
const route = express.Router();
const {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
} = require("../controller/userController");

// Base route for /api
route.get("/", (req, res) => {
  //   console.log("this ifow");
  res.json({ message: "Welcome to the API" });
});

// Route for creating a user
route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteOne);

module.exports = route;
