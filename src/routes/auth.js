const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of Data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
     const token = await savedUser.getJWT(); 

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), 
      });

    res.json({message: "User Added successfully" , data : savedUser });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check email is in the database or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT token
      const token = await user.getJWT();

      //Add a token To cookie and send the RESPONSE back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

res.send("Logout Successfully")
});

module.exports = authRouter;
