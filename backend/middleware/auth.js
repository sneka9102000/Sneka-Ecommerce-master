const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const User = require("../models/userModel")

class Authentication{

isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, token) => {
    const user = await User.findById(token.id)
    req.user = user;
    console.log(user)
    next();
  })
});


authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (roles != req.user.role) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
  console.log("authorized")
    next();
  };
};
}
module.exports = Authentication;