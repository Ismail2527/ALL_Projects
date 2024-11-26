const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const session = require('express-session'); // Import express-session
const flash = require('connect-flash'); // Import connect-flash

const user = require('./routes/user');
const index = require('./routes/index');
const passport = require('passport'); // Ensure you import Passport correctly


const app = express();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db) // Added options for better compatibility
    .then(() => console.log("MongoDB Connected...."))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
    secret: 'Secret', // Change this to a strong secret
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash middleware
app.use(flash());



// Middleware to expose flash messages in all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // Success messages
    res.locals.error_msg = req.flash('error_msg'); // Single error message
    res.locals.errors = req.flash('error'); // Array of errors
    // res.locals.error = req.flash('error'); // Array of errors
    next();
});

// Routes
app.use('/', index);
app.use('/users', user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
