const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model
  const user = new User({
    firstName: "Sachin",
    lastName: "kumar",
    email: "Sachinabx3@gmail.com",
    password: "Sachin@123",
  });
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error saving thr user :" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen("7777", () => {
      console.log("the server can listen successfully");
    });
  })
  .catch((err) => {
    console.error("Connection is not establish!!");
  });
