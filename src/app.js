const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
    // try {
    //   const users = await User.find({emailId : userEmail})
    //   if(!users){
    //     res.status(404).send("User Not Found")
    //   }
    //   else{
    //     res.send(users)
    //   }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Feed API - GET /feed - get all users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    // here returnDOcument is for the sake of what data is send to DB -->"before" & "after" 
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDOcument: "after",
      runValidators:true,
    });
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // they both are same
    await User.findByIdAndDelete({ _id: userId });
    // await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
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
