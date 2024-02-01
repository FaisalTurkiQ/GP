const Test = require('../models/tests');

const createTest = async (req, res) => {
  try {
    const { questions, feedback } = req.body;
    const newTest = new Test({ questions, feedback });
    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const evaluateTest = async (req, res) => {
  try {
    const { testId, userResponses } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    let score = 0;
    userResponses.forEach((response, index) => {
      if (response === test.questions[index].correctOption) {
        score += 1;
      }
    });

    res.status(200).json({ message: 'Test evaluated successfully', score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTest,
  evaluateTest,
};
