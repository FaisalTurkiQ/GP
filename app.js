const express = require("express");
require('dotenv').config();
const app = express();
const passport = require('passport');
const session = require('express-session');

require('./config/db');

const morgan = require('morgan');
app.use(morgan('dev'))

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-config')(passport);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login middleware
const isAuthenticated = require('./middlewares/isAuthenticated');

// routes
app.use("/users", require("./routes/users"));
app.use("/courses",isAuthenticated, require("./routes/courses"));
app.use("/chapters",isAuthenticated, require("./routes/chapters"));

app.get('/',(req,res)=>{
  res.json({"message":"API is Work"})
})

app.listen(process.env.PORT, () => {
    console.log(`API is listening on port ${process.env.PORT}`);
});

