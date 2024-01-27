const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema ({
    title : {type : String, required : true},
    description : {type : String, required : true},
    chapters : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' }],
})

module.exports = mongoose.model('Courses', coursesSchema)