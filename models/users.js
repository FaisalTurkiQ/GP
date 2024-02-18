const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const validator = require('validator');


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true , lowercase: true , validate : [validator.isEmail,'Please enter a valid email']},
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses', default: [] }],
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

userSchema.plugin(passportLocalMongoose)
User = mongoose.model('User',userSchema)
module.exports = User