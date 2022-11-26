const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const QuestionRoute = require("./routes/Question.route");
dotenv.config();
const app = express();
const PORT = process.env.PORT||8080;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("this is quiz application")
})
app.use("/question",QuestionRoute)

mongoose.connect(process.env.MONGO_DB).then(() => {
  app.listen(PORT, () => {
    console.log("server is started on port " + PORT);
  });
});
