const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/Users");
const app = express();
app.use(express.json());
app.use(cors());
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
    let result = await User.findOne(req.body);
    if (result) {
      res.send("user logged in");
    } else {
      res.send("error");
    }
  }
});
app.listen(5000);
