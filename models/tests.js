const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
});

const testSchema = new mongoose.Schema({
  questions: [questionSchema],
  feedback: { type: String, required: true },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
