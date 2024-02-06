const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizzes');

router.get('/:courseId/', quizController.getAllQuizzes);
router.get('/:courseId/:id', quizController.getQuizById);
router.post('/:courseId/', quizController.createQuiz);
router.put('/:courseId/:id', quizController.updateQuiz);
router.delete('/:courseId/:id', quizController.deleteQuiz);

module.exports = router;
