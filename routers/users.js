const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const User = require('../models/users');
const passport = require('passport');


// User Routes
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/register', userController.register)

m = require('../middlewares/isLoggedIn');

router.post('/login', passport.authenticate('local'), (req,res) => {
    res.json({"Yes": true})
})

module.exports = router;
