const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password !");
  }
};

const validateEditProfileData = (req) => {
  const allowededitFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowededitFields.includes(field)
  );
  return isEditAllowed;
};


module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
