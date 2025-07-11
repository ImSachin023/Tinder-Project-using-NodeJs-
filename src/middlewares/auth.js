const AdminAuth = (req, res, next) => {
  console.log("Admin is verified");
  const token = "xyz";
  const isadminAuthorised = token === "xyz";
  if (!isadminAuthorised) {
    res.status(401).send("Unauthorised Access");
  } else {
    next();
  }
};

const UserAuth = (req, res, next) => {
  console.log("User is verified");
  const token = "xyz";
  const isadminAuthorised = token === "xyz";
  if (!isadminAuthorised) {
    res.status(401).send("Unauthorised Access");
  } else {
    next();
  }
};

module.exports = {
  AdminAuth,
  UserAuth
};
