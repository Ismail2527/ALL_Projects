const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGOURI;

const connectDBAndServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDBAndServer();

module.exports = connectDBAndServer;
