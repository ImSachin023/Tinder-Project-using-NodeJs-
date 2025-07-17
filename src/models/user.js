const mongoose = require("mongoose");
const validator = require("validator")

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid email address :"+ value)
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 50,
       validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("enter a strong password :"+ value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2Fxiihwx_download-empty-profile-hd-png-download%2F&psig=AOvVaw3GhsS1mznuGiOEv9EWzt_s&ust=1752842092927000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjBsOfzw44DFQAAAAAdAAAAABAE",
       validate(value){
        if(!validator.isURL(value)){
          throw new Error("invalid photo URL :"+ value)
        }
      }

    },
    about: {
      type: String,
      default: "This is a default about of the user!!",
    },
    skills: {
      type: [String],
    },
  },
  { 
    timestamps: true
  }
);
module.exports = mongoose.model("User", UserSchema);
