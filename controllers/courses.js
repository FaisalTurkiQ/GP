const Courses = require('../models/courses');

const getAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const courses = await Courses.find({ userId: userId });

    res.status(200).json({'courses':courses});
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

const getById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Courses.findOne({ _id: courseId, userId: userId });
    if (!course) {
      return res.status(404).json({ 'error': 'Course not found or access denied' });
    }

    res.status(200).json({'course':course});
  } catch (err) {
    console.error(err);
    res.status(500).json({ 'error': err.message });
  }
};

const update = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const updatedCourse = await Courses.findOneAndUpdate(
      { _id: courseId, userId: userId },
      req.body,
      { new: true}
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
    res.status(500).json({ error: err.message });
  }
};

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
