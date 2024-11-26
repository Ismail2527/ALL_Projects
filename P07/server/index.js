// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoute");
// const Db = require("./connection/dbAndserver");
// Ensure you import your user routes correctly

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Define the port and MongoDB URI
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGOURI;

// Function to connect to MongoDB and start the server
const connectDBAndServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Simple route for testing
// app.get("/api", userRoutes);

// Use user routes under the /api path
app.use("/api", userRoutes); // Ensure this line is added to handle routes

// Call the function to connect to the database and start the server
connectDBAndServer();
// Db();

module.exports = app; // Export the app for testing or further use
