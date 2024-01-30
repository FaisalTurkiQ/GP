const express = require('express')

const router = express.Router()

const coursesControllers = require('../controllers/Courses')

router.get('/', coursesControllers.getAll)
router.get('/:id', coursesControllers.getById)
router.post('/', coursesControllers.create)
router.put('/:id', coursesControllers.update)
router.delete('/:id', coursesControllers.deleteByID)

module.exports = router