const Chapter = require('../models/chapters')
const Courses = require('../models/courses')
const mongoose = require('mongoose')

// For PDF
const pdfParse = require('pdf-parse');

const getAll = async (req,res) => {
    try {
        const course = await Courses.findById(req.params.courseId).populate('chapters');
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        const chapters = course.chapters;
    
        res.status(200).json(chapters);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req,res) => {
    try {
        const courseId = req.params.courseId;
        const chapterId = req.params.chapterId;
    
        const course = await Courses.findById(courseId).populate('chapters');
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        const chapter = course.chapters.find(chapter => chapter._id.toString() === chapterId);
    
        if (!chapter) {
          return res.status(404).json({ error: 'Chapter not found in the course' });
        }
    
        res.status(200).json(chapter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const update = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const chapterId = req.params.chapterId;
    
        const course = await Courses.findById(courseId);
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        const chapterIndex = course.chapters.indexOf(chapterId);
    
        if (chapterIndex === -1) {
          return res.status(404).json({ error: 'Chapter not found in the course' });
        }
    
        const { title, content } = req.body;
    
        course.chapters[chapterIndex].title = title;
        course.chapters[chapterIndex].content = content;
    
        await course.save();
    
        res.status(200).json(course.chapters[chapterIndex]);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}


const create = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'Invalid course ID format' });
    }
    const course = await Courses.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!req.file) {
      return res.status(400).send('No PDF file uploaded.');
    }

    const pdfBuffer = req.file.buffer;
    const pdfData = pdfBuffer.toString('utf8');
    
    const data = await pdfParse(pdfBuffer);

    const newChapter = await createChapter(req.body.title, data.text);

    course.chapters.push(newChapter);
    await course.save();

    res.status(201).json(newChapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createChapter = async (title, content) => {
  const chapter = {
    title: title,
    content: content,
  };

  const newChapter = new Chapter(chapter);
  await newChapter.save();

  return newChapter;
};

const deleteByID = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const chapterId = req.params.chapterId;
    
        const course = await Courses.findById(courseId);
    
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
    
        const chapterIndex = course.chapters.indexOf(chapterId);
    
        if (chapterIndex === -1) {
          return res.status(404).json({ error: 'Chapter not found in the course' });
        }
    
        course.chapters.splice(chapterIndex, 1);
    
        await course.save();
    
        res.status(204).send(); // 204 No Content indicates successful deletion
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteByID
}