const express = require("express"); 


require('dotenv').config();
const app = express(); 
const db = require('./config/db');
const session = require('express-session');


//passport init
const User = require('./models/users');
const passport = require('passport');
const localStrategy = require('passport-local');
app.use(session({
    secret: 'LongLiveTheKing',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.json({success:"success"})
})

const usersRouter = require("./routers/users");
app.use("/users",usersRouter)

const coursesRouter = require("./routers/courses");
app.use("/courses",coursesRouter)

const chaptersRouter = require("./routers/chapters");
app.use("/chapters",chaptersRouter)

const testsRouter = require("./routers/quizzes");
app.use("/quizzes",testsRouter)

app.listen(process.env.PORT, () => { 
    console.log(`API is listening on port ${process.env.PORT}`); 
});