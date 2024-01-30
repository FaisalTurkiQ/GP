const express = require("express"); 
require('dotenv').config();

const app = express(); 

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const coursesRouter = require("./routers/Courses");
app.use("/courses",coursesRouter)

const chaptersRouter = require("./routers/Chapters");
app.use("/chapters",chaptersRouter)

const PORT = process.env.PORT; 
app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
