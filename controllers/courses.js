const Courses = require('../models/Courses');

const getAll = async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.status(200).json({ 'courses': courses });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
};

const getById = async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
};

const update = async (req, res) => {
  try {
    await Courses.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ 'message': 'Course updated successfully', 'course': req.body });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
};

const create = async (req, res) => {
  try {
    const newCourse = new Courses(req.body);
    await newCourse.save();
    res.status(200).json({ 'message': 'Course created successfully', 'course': newCourse });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
};

const deleteByID = async (req, res) => {
  try {
    await Courses.findByIdAndDelete(req.params.id);
    res.status(200).json({ 'message': 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ 'error': err.message });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteByID
};
