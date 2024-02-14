const Courses = require('../models/courses');

// Get all courses for the logged-in user
const getAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const courses = await Courses.find({ userId: userId });

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

// Get a single course by ID, ensuring it belongs to the logged-in user
const getById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Courses.findOne({ _id: courseId, userId: userId });
    if (!course) {
      return res.status(404).json({ 'error': 'Course not found or access denied' });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

// Update a course, ensuring it belongs to the logged-in user
const update = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const updatedCourse = await Courses.findOneAndUpdate(
      { _id: courseId, userId: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ 'error': 'Course not found or access denied' });
    }

    res.status(200).json({ 'message': 'Course updated successfully', updatedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

// Delete a course, ensuring it belongs to the logged-in user
const deleteByID = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Courses.findOneAndDelete({ _id: courseId, userId: userId });
    if (!course) {
      return res.status(404).json({ 'error': 'Course not found or access denied' });
    }

    res.status(200).json({ 'message': 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

// Create a new course and associate it with the logged-in user
const create = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseData = { ...req.body, userId: userId };
    const newCourse = new Courses(courseData);
    const savedCourse = await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: savedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteByID
};
