const mongoose = require("mongoose");
//mongoose.connect("mongodb://127.0.0.1:27017/Aupdeshik");
mongoose.connect(process.env.CONNECTION);
