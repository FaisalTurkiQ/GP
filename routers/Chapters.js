const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapters');

router.get('/:courseId/', chapterController.getAll);

router.get('/:courseId/:chapterId', chapterController.getById);

router.post('/:courseId/', chapterController.create);

router.put('/:courseId/:chapterId', chapterController.update);

router.delete('/:courseId/:chapterId', chapterController.deleteByID);

module.exports = router;
