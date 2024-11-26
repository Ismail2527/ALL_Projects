require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverrride = require("method-override");
const flash = require("express-flash"); // Correct flash import
const session = require("express-session");
const connectDB = require("./server/config/db");

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverrride("_method"));

// Serve Static Files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Flash Messages
app.use(flash()); // Correct flash middleware usage

// Templating Engine Setup
app.use(expressLayout);
app.set("layout", "./layouts/main"); // Layout file path
app.set("view engine", "ejs"); // Set EJS as templating engine

// Routes
app.use("/", require("./server/routes/customer"));

// Handle 404 - Page Not Found
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
