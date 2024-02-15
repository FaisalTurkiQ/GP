const express = require("express");
require('dotenv').config();
const app = express();
const passport = require('passport');
const session = require('express-session');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./config/swaggerConfig');

  
const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'], // Adjust the path to wherever your route files are located
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Database configuration
require('./config/db');

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'YourSessionSecret',
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

const isLoggedIn = require('./middlewares/isAuthenticated');
// Routers
app.use("/users", require("./routers/users"));
app.use("/courses",isLoggedIn, require("./routers/courses"));
app.use("/chapters",isLoggedIn, require("./routers/chapters"));

// Server listening
app.listen(process.env.PORT, () => {
    console.log(`API is listening on port ${process.env.PORT}`);
});
