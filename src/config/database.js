const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sachindb43:Sachin914@cluster0.xvz1ln7.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

