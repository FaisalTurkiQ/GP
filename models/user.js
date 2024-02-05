const mongoose = require('mongoose');
// Passport Init
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
  // removed name, and password, since passport does it.
  email: { type: String, required: true, unique: true },
  adminLevel: { type: Number, default: 0 },
});


// passport init
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)


// Faisal, create another file for students.


// const studentSchema = new mongoose.Schema({
//   user: { type: userSchema, required: true },
//   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
// });

// const Student = mongoose.model('Student', studentSchema);

// module.exports = { User, Student };