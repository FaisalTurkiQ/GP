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

const flashCardSchema = new mongoose.Schema({
  question: {type : String, required : true},
  answer : {type : String, required : true}
});

const coursesSchema = new mongoose.Schema ({
    title : {type : String, required : true},
    description : {type : String, required : true},
    chapters : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' ,default: []}],
    quiz : {
      type: [{
        title : {type : String, required : true},
        questions : { type : [questionSchema], required : true} ,
        score : {type : Number, default : null}
      }],
      default: []
    },
    summary : {
        type: [{
            title: {type : String, required : true},
            summary : {type : String, required : true}
        }],
        default: []
    },
    flashCards : {
        type: [{
            title: {type : String, required : true},
            flashcards : {type : [flashCardSchema] , required : true}
        }],
        default: []
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
})

module.exports = mongoose.model('Courses', coursesSchema)