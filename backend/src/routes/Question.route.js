const { Router } = require("express");
const QuestionModel = require("../models/Question.model");
const QuestionRoute = Router();

QuestionRoute.post("/create", async (req, res) => {
  try {
    const { question, correct_ans, difficulty, opt1, opt2, opt3, opt4 } =
      req.body;
    let newQuestion = new QuestionModel({
      question: question,
      correct_ans: correct_ans,
      difficulty: difficulty,
      opt1: opt1,
      opt2: opt2,
      opt3: opt3,
      opt4: opt4,
    });
    await newQuestion.save();
    res.status(200).send(newQuestion);
  } catch (e) {
    res.status(400).send("something bad happen");
  }
});

QuestionRoute.get("/", async (req, res) => {
  try {
    const { difficulty } = req.query;
    // console.log(req.query)
    let data = await QuestionModel.find({ difficulty: difficulty });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = QuestionRoute;
