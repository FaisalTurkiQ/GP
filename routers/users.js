const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// User Routes
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

// Student Routes
router.post('/students', userController.createStudent);
router.get('/students/:id', userController.getStudentById);
router.put('/students/:id', userController.updateStudentById);
router.delete('/students/:id', userController.deleteStudentById);

module.exports = router;
