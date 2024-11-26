const {
  homeController,
  homeCreateController,
  homeReadController,
  homeShowController,
  homeUpdateController,
  homeDeleteController,
} = require("./Controllers/HomeController");

const express = require("express");
const route = express.Router();

route.get("/", homeController);
route.post("/", homeCreateController);
route.get("/read/", homeReadController);
route.get("/edit/:id", homeShowController);
route.post("/update/:id", homeUpdateController);
route.get("/delete/:id", homeDeleteController);

module.exports = route;
