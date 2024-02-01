const express = require("express"); 
require('dotenv').config();

const app = express(); 

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI).then(() =>{
    app.listen(process.env.PORT, () => { 
        console.log(`API is listening on port ${process.env.PORT}`); 
    });
    
}).catch((err) => console.error(err));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const coursesRouter = require("./routers/courses");
app.use("/courses",coursesRouter)

const chaptersRouter = require("./routers/chapters");
app.use("/chapters",chaptersRouter)

const testsRouter = require("./routers/tests");
app.use("/tests",testsRouter)
