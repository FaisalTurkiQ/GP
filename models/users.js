const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses', default: [] }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes', default: [] }],
  roles: [{ type: String, enum: ['admin', 'user'], default: 'user' }],
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
