const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/Users");
const Questions = require("./db/Questions");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// Routes
// Testing route
app.post("/test", (req, res) => {
  res.send({ result: "POST working" });
});

// Register route
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  console.log(result);
  res.send({ result: "success" });
});

// Login route
// Assuming you have already defined your express app and middleware

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are valid
  // Perform authentication logic here, such as querying the database
  // Assume User is your Mongoose model for users

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      // Authentication successful
      res.json({
        _id: user._id,
        email: user.email /* Add other user data if needed */,
      });
    } else {
      // Authentication failed
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let result = await User.findOne(req.body).select("-password");
//     if (result) {
//       res.send(result);
//     } else {
//       res.send({ result: "user not found" });
//     }
//   }
// });

// Question route
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//pervious code
// const express = require("express");
// const cors = require("cors");
// require("./db/config");
// const User = require("./db/Users");
// const Questions = require("./db/Questions");
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
// //testing
// app.post("/test", (req, res) => {
//   res.send({ result: "POst working" });
// });
// //register API
// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   console.log(result);
//   res.send({ result: "success" });
// });
// //loginapi
// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let result = await User.findOne(req.body).select("-password");
//     if (result) {
//       res.send(result);
//     } else {
//       res.send({ result: "user not found" });
//     }
//   }
// });

// //question api
// app.get("/array-questions", async (req, res) => {
//   try {
//     let result = await Questions.find();
//     if (result.length > 0) {
//       res.send(result);
//     } else {
//       res.send({ result: "nothing to show" });
//     }
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// app.listen(5000);
