const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adminLevel: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

const studentSchema = new mongoose.Schema({
  user: { type: userSchema, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { User, Student };
