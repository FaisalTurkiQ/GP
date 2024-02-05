const express = require("express"); 


require('dotenv').config();
const app = express(); 
const db = require('./config/db');



//passport init
const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');
// app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const coursesRouter = require("./routers/courses");
app.use("/courses",coursesRouter)

const chaptersRouter = require("./routers/chapters");
app.use("/chapters",chaptersRouter)

const testsRouter = require("./routers/tests");
app.use("/tests",testsRouter)

app.listen(process.env.PORT, () => { 
    console.log(`API is listening on port ${process.env.PORT}`); 
});