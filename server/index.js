const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/Users");
const Questions = require("./db/Questions");
const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
//testing
app.post("/test", (req, res) => {
  res.send({ result: "POst working" });
});
//register API
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  console.log(result);
  res.send({ result: "success" });
});
//loginapi
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let result = await User.findOne(req.body).select("-password");
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "user not found" });
    }
  }
});

//question api
app.get("/array-questions", async (req, res) => {
  try {
    let result = await Questions.find();
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ result: "nothing to show" });
    }
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(5000);
