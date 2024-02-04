const express = require("express"); 
require('dotenv').config();
const app = express(); 
const db = require('./config/db');

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