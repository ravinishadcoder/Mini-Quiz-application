const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    question: String,
    correct_ans: String,
    difficulty:Number,
    opt1: String,
    opt2: String,
    opt3:String,
    opt4: String,
})

const QuestionModel=mongoose.model("question",QuestionSchema)

module.exports=QuestionModel