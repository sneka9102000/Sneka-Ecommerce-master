const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const bcrypt = require('bcrypt')
require("dotenv").config();
const cloudinary = require("cloudinary");

class UserController {

  registerUser = catchAsyncErrors(async (req, res, next) => {
    
    try {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const { name, email, password, phone, address } = req.body;

    const hashedPass = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPass,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    sendToken(user, 201, res);
  } 
  catch (err) {
    res.status(500).json({error: err})
  }
  });



  loginUser = catchAsyncErrors(async (req, res, next) => {

  try{
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  }

  catch (err) {
    res.status(500).json({error: err})
  }
  });



  logout = catchAsyncErrors(async (req, res, next) => {

  try{
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });


  getUserDetails = catchAsyncErrors(async (req, res, next) => {

  try{const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });


  updatePassword = catchAsyncErrors(async (req, res, next) => {

  try{
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = await bcrypt.hash(req.body.newPassword, 10)
    console.log("user",user.password)
    await user.save();
  
    sendToken(user, 200, res);
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });

  updateProfile = catchAsyncErrors(async (req, res, next) => {
  try{
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar !== undefined) {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(user)
    res.status(200).json({
      success: true,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  }
  );

  getAllUser = catchAsyncErrors(async (req, res, next) => {
  try{
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });

  getSingleUser = catchAsyncErrors(async (req, res, next) => {
  try{const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });
  
  // update User Role -- Admin
  updateUserRole = catchAsyncErrors(async (req, res, next) => {
    try{const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }

  });
  
  //Delete User --Admin
  deleteUser = catchAsyncErrors(async (req, res, next) => {
    try{
      const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  }
  catch (err) {
    res.status(500).json({error: err})
  }
  });
}

module.exports = UserController;

