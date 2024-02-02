const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapters');

// For PDF
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:courseId/', chapterController.getAll);

router.get('/:courseId/:chapterId', chapterController.getById);

router.post('/:courseId/', upload.single('pdf'), chapterController.create);

router.put('/:courseId/:chapterId', chapterController.update);

router.delete('/:courseId/:chapterId', chapterController.deleteByID);

module.exports = router;
