// const mongoose = require("mongoose");
// console.log(process.env.CONNECTION);
//mongoose.connect("mongodb://127.0.0.1:27017/Aupdeshik");
//mongoose.connect(process.env.CONNECTION);
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.CONNECTION);
