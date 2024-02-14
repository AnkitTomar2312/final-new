const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("questions", QuestionSchema);
