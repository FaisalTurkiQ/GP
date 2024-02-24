const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapters');
const OpenAIAPI = require('openai');

// For PDF
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:courseId/', chapterController.getAll);
router.get('/:courseId/:chapterId', chapterController.getById);
router.post('/:courseId/', upload.single('pdf'), chapterController.create);
router.delete('/:courseId/:chapterId', chapterController.deleteByID);


router.post('/:chapterId/:chapterId/flashcard', chapterController.generateFlashCard);
router.post('/:courseId/:chapterId/quiz', chapterController.generateQuiz);
router.post('/:courseId/:chapterId/summary', chapterController.generateSummary);

module.exports = router;

/**
 * @swagger
 * tags:
 *   - name: Chapters
 *     description: Chapter management and content generation
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the chapter
 *         title:
 *           type: string
 *           description: Title of the chapter
 *         content:
 *           type: string
 *           description: Content of the chapter
 * paths:
 *   /chapters/{courseId}/:
 *     get:
 *       summary: Get all chapters for a specific course
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *       responses:
 *         200:
 *           description: List of chapters for the course
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Chapter'
 *         404:
 *           description: Course not found or not authorized
 *     post:
 *       summary: Create a chapter for a specific course
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 pdf:
 *                   type: string
 *                   format: binary
 *                   description: PDF file of the chapter content
 *       responses:
 *         201:
 *           description: Chapter created successfully
 *         400:
 *           description: No PDF file uploaded
 *         404:
 *           description: Course not found or not authorized
 *   /chapters/{courseId}/{chapterId}:
 *     get:
 *       summary: Get a chapter by ID for a specific course
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *         - in: path
 *           name: chapterId
 *           schema:
 *             type: string
 *           required: true
 *           description: The chapter ID
 *       responses:
 *         200:
 *           description: Chapter details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Chapter'
 *         404:
 *           description: Chapter not found in the course
 *     delete:
 *       summary: Delete a chapter by ID for a specific course
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *         - in: path
 *           name: chapterId
 *           schema:
 *             type: string
 *           required: true
 *           description: The chapter ID
 *       responses:
 *         200:
 *           description: Chapter deleted successfully
 *         404:
 *           description: Chapter not found in the course
 *   /chapters/{courseId}/{chapterId}/flashcard:
 *     post:
 *       summary: Generate flashcards for a chapter
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *         - in: path
 *           name: chapterId
 *           schema:
 *             type: string
 *           required: true
 *           description: The chapter ID
 *       responses:
 *         200:
 *           description: Flashcards generated successfully
 *         404:
 *           description: Course or chapter not found
 *   /chapters/{courseId}/{chapterId}/quiz:
 *     post:
 *       summary: Generate a quiz for a chapter
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *         - in: path
 *           name: chapterId
 *           schema:
 *             type: string
 *           required: true
 *           description: The chapter ID
 *       responses:
 *         200:
 *           description: Quiz generated successfully
 *         404:
 *           description: Course or chapter not found
 *   /chapters/{courseId}/{chapterId}/summary:
 *     post:
 *       summary: Generate a summary for a chapter
 *       tags: [Chapters]
 *       parameters:
 *         - in: path
 *           name: courseId
 *           schema:
 *             type: string
 *           required: true
 *           description: The course ID
 *         - in: path
 *           name: chapterId
 *           schema:
 *             type: string
 *           required: true
 *           description: The chapter ID
 *       responses:
 *         200:
 *           description: Summary generated successfully
 *         404:
 *           description: Course or chapter not found
 */
