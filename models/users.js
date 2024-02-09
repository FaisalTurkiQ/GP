const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses', default: [] }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes', default: [] }],
  roles: [{ type: String, enum: ['admin', 'user'], default: 'user' }],
});

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)