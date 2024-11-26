const express = require('express');
const ownersRouter = require('./routes/ownersRouter');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require("dotenv").config();

// Connect to the database
const db = require('./config/mongoose-connection');

// Middleware for cookies

// Session management
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

// Flash messages middleware
app.use(flash());

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory for views (EJS files)
app.set('views', path.join(__dirname, 'views')); // Ensure the 'views' folder is in the root directory

// Define routes
app.use("/",indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Start the server
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
