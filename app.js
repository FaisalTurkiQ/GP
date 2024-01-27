const express = require("express"); 

const app = express(); 

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rokam');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const coursesRouter = require("./routers/courses");
app.use("/courses",coursesRouter)

const PORT = 8080; 
app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
