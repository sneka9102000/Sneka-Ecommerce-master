const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const crypto=require("crypto");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should have more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [7, "Password should be greater than 7 characters"],
      select: false,
      trim:true
    },
    confirmpassword: {
      type: String,
      required: [true, "Please confirm Your Password"],
      minLength: [7, "Password should be greater than 7 characters"],
      select: false,
      trim:true
    },
    phone: {
      type: String,
      required: [true, "Please Enter Your PhoneNumber"],
      maxLength: [10, "Number cannot exceed 10 digits"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
      maxLength: [30, "Address cannot exceed 30 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = bcrypt.hash(this.password,10)
});


//jwt token 
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},""+process.env.JWT_SECRET,{
        expiresIn:'5h',
    });
};

//Compare Password
userSchema.methods.comparePassword =  async function (enteredPassword) { 
  return await bcrypt.compare(enteredPassword,this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

 


module.exports=mongoose.model("User",userSchema);

