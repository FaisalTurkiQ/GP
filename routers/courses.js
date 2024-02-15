const express = require('express')

const router = express.Router()

const coursesControllers = require('../controllers/courses')

router.get('/', coursesControllers.getAll)
router.get('/:id', coursesControllers.getById)
router.post('/', coursesControllers.create)
router.put('/:id', coursesControllers.update)
router.delete('/:id', coursesControllers.deleteByID)

module.exports = router


/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API to manage courses
 * 
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         chapters:
 *           type: array
 *           items:
 *             type: string
 *           description: List of chapter IDs associated with the course
 *         quiz:
 *           type: array
 *           description: Quizzes associated with the course
 *           items:
 *             $ref: '#/components/schemas/Quiz'
 *         summary:
 *           type: array
 *           description: Summaries associated with the course
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *         flashCards:
 *           type: array
 *           description: FlashCards associated with the course
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               flashcards:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/FlashCard'
 *       example:
 *         title: "Introduction to Programming"
 *         description: "This course covers the basics of programming."
 * 
 *     Quiz:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         score:
 *           type: number
 * 
 *     Question:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *         correctOption:
 *           type: number
 * 
 *     FlashCard:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 * 
 * /courses:
 *   get:
 *     summary: Get all courses for the logged-in user
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 * 
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 * 
 * /courses/{id}:
 *   get:
 *     summary: Get a single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A single course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 * 
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 * 
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
