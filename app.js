const express = require("express");
require('dotenv').config();
const app = express();
const passport = require('passport');
const session = require('express-session');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./config/swaggerConfig');

const cors = require('cors');

const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
  
const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'], // Adjust the path to wherever your route files are located
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// to allow Origin
app.use(cors({
  origin: 'https://g-project-ae56e53e4f20.herokuapp.com'
}))

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
const isLoggedIn = require('./middlewares/isAuthenticated');

// Routers
app.use("/users", require("./routers/users"));
app.use("/courses",isLoggedIn, require("./routers/courses"));
app.use("/chapters",isLoggedIn, require("./routers/chapters"));


module.exports = app;