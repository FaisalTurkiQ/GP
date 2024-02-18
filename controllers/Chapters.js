const Chapter = require('../models/chapters')
const Courses = require('../models/courses')
const { OpenAI } = require('openai');
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });
// For PDF
const pdfParse = require('pdf-parse');
const estimateTokenCount = require('../utils/estimateTokenCount')

const getAll = async (req, res) => {
  try {
      const userId = req.user._id;
      const courseId = req.params.courseId;
      
      const course = await Courses.findOne({_id: courseId, userId: userId}).populate('chapters');
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found or not authorized' });
      }
      
      res.status(200).json(course.chapters);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};


const getById = async (req, res) => {
  try {
      const userId = req.user._id;
      const courseId = req.params.courseId;
      const chapterId = req.params.chapterId;

      // First, confirm the course belongs to the user
      const course = await Courses.findOne({ _id: courseId, userId: userId });
      if (!course) {
        return res.status(404).json({ error: 'Course not found or not authorized' });
      }

      // Then, find the chapter ensuring it belongs to the course
      const chapter = await Chapter.findOne({ _id: chapterId, _id: { $in: course.chapters } });
      if (!chapter) {
        return res.status(404).json({ error: 'Chapter not found in the course' });
      }

      res.status(200).json(chapter);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};

const create = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    const course = await Courses.findOne({ _id: courseId, userId: userId });

    if (!course) {
      return res.status(404).json({ error: 'Course not found or not authorized' });
    }

    if (!req.file) {
      return res.status(400).send('No PDF file uploaded.');
    }

    // Assuming PDF parsing and chapter creation is handled here
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    const newChapter = await createChapter(req.body.title, data.text);

    course.chapters.push(newChapter._id);
    await course.save();

    res.status(201).json({newChapter,token:estimateTokenCount(data.text)});
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
      const userId = req.user._id;
      const courseId = req.params.courseId;
      const chapterId = req.params.chapterId;
      
      const course = await Courses.findOne({ _id: courseId, userId: userId });
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found or not authorized' });
      }
      
      const chapterIndex = course.chapters.indexOf(chapterId);
      
      if (chapterIndex === -1) {
        return res.status(404).json({ error: 'Chapter not found in the course' });
      }
      
      // Remove chapter reference from course
      course.chapters.splice(chapterIndex, 1);
      await course.save();

      // Optionally, delete the chapter document from the Chapters collection
      await Chapter.findByIdAndDelete(chapterId);
      
      res.status(200).json({ 'message': 'Chapter deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
};


const generateQuiz = async (req, res) => {

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        // prompt: message,
        max_tokens: 8100,
        messages: [
            // {"role": "system", "content": "You are an educational assistant."},
            // {"role": "user", "content": `Provide a summary for the ${title} course content.`},
            // {"role": "assistant", "content": "Certainly! Please provide the content of the course that you'd like me to summarize."},
            // {"role": "user", "content": content},
            {"role": "user", "content":"I need you to write a quiz with 4 questions in the following topics for the course OOP: if, while."},
            {"role": "system", "content":"I need the response to be in JSON format no need to add addition text only return json max tokens is 8000"}
        ]        
        // temperature: 0.9,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0.6,
        // stop: [" Human:", " AI:"],
    });
    console.log("response",response);
    const jsonObject = JSON.parse(response.choices[0].message.content);
    console.log(jsonObject);

    res.json(jsonObject);

  }catch(e) {
    res.json({ error : e.message });
  }
};

const generateSummary = async (req, res) => {
  const userId = req.user._id;
  const courseId = req.params.courseId;
  const chapterId = req.params.chapterId;  
  try {
    // Fetch the chapter content from the database
    const course = await Courses.findOne({ _id: courseId, userId: userId }).populate('chapters');

    if (!course) {
      return res.status(404).json({ error: 'Course not found or not authorized' });
    }
  
    // Now 'course.chapters' should be an array of chapter documents, not just IDs
    const chapter = course.chapters.find(chapter => chapter._id.toString() === chapterId);
  
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found in the course' });
    }

    var courseTitle = course.title
    var chapterTitle = chapter.title
    var chapterContent = chapter.content

    // Now you have chapter.title and chapter.content
    // Next, call the OpenAI API as before but using chapter details
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 1000,
      messages: [
        // Setting the context for the AI, replacing [Example] with the actual course title
        {"role": "system", "content": `You are an instructor tasked with summarizing each chapter of the ${courseTitle} course. Your approach should be guided by the 20/80 rule, focusing on the most critical 20% of the content that will give students 80% of the required understanding.`},
        
        // Instructing the AI with the specifics of the task, using the actual chapter title and content
        {"role": "user", "content": `Review the content provided for the "${chapterTitle}" chapter of the ${courseTitle} course. Understand the key concepts, principles, and examples presented. Identify the core elements that are essential to understanding ${courseTitle}, and develop a concise summary covering the most crucial concepts and principles along with key examples or applications. Ensure the summary captures the most impactful 20% of the content, providing a comprehensive understanding sufficient for 80% of typical use cases or applications in ${courseTitle}. The chapter content is as follows: ${chapterContent}`},
        
        // Clarification on the format of the response
        {"role": "system", "content": "The response should be a concise summary in plain text, focusing on clarity and relevance to the course's learning objectives. Organize the summary in a structured manner, corresponding to the layout and progression of the chapter."},
      ]
    });

    // Assuming the summary is generated correctly
    const summaryText = response.choices[0].message.content;

    // Update the course document with the new summary
    await Courses.findByIdAndUpdate(courseId, {
      $push: { 'summary': { title: chapterTitle, summary: summaryText } }
    }, { new: true });

    res.json({ message: 'Summary generated and saved successfully' , summary : { title: chapterTitle , summary: summaryText } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

const generateFlashCard = async (req, res) => {
  const courseId = req.params.courseId;
  const chapterId = req.params.chapterId;
    
  const course = await Courses.findById(courseId);
  
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  const chapter = await Courses.findById(chapterId);
  
  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  
  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 8100,
        messages: [
            // {"role": "system", "content": "You are an educational assistant."},
            // {"role": "user", "content": `Provide a summary for the ${title} course content.`},
            // {"role": "assistant", "content": "Certainly! Please provide the content of the course that you'd like me to summarize."},
            // {"role": "user", "content": content},
            {"role": "user", "content":"I need you to write a quiz with 4 questions in the following topics for the course OOP: if, while."},
            {"role": "system", "content":"I need the response to be in JSON format no need to add addition text only return json max tokens is 8000"}
        ]
    });
    console.log("response",response);
    const FlashCard = response.choices[0].message.content;


    course.flashCards.push(flashCards);
    await course.save();

    res.json(flashCards);

  }catch(e) {
    res.json({ error : e.message });
  }
};

module.exports = {
    getAll,
    create,
    getById,
    deleteByID,
    generateFlashCard,
    generateSummary,
    generateQuiz
}