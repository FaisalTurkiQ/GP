const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    type: [{
      type: String,
      required: true,
    }],
    validate: [
      {
        validator: function(options) {
          return options.length === 4;
        },
        message: 'A question must have exactly 4 options.'
      },
      {
        validator: function(options) {
          return new Set(options).size === options.length;
        },
        message: 'Options must be unique.'
      }
    ],
    required: true
  },
  correctOption: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0 && value <= 3;
      },
      message: 'correctOption must be between 0 and 3, and should be a valid index in options.'
    }
  }
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
  feedback: { type: String, required: true , default : null},
});

const Quiz = mongoose.model('Quizzes', quizSchema);

module.exports = Quiz;
