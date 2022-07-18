import {
    NAME_REGEX,
    EMAIL_REGEX,
    PASSWORD_REGEX,
    PHONE_REGEX,
    ADDRESS_REGEX
    
  } from "../constants/validationConstant/index.js";

function ValidateRegister(name,email,password,phone,address,confirmpassword) {
    const regerror = {
        nameError: "",
        emailError : "",
        passwordError : "",
        confirmpasswordError:"",
        phoneError: "",
        addressError:""
    }
   
    if (name === "") {
        regerror.nameError = "Enter your name";
    }
    else if (!NAME_REGEX.test(name)) {
        regerror.nameError = "Invalid name . Please correct and try again.";
    }
 
    if (email === "") {
        regerror.emailError = "Enter your email";
    }
    else if (!EMAIL_REGEX.test(email)) {
        regerror.emailError = "Invalid email address. Please correct and try again.";
    }

    if (password === "") {
        regerror.passwordError = "Enter your password";
    }
    else if (!PASSWORD_REGEX.test(password)) {
        regerror.passwordError = "Minimum 7 characters required";
    }
    if (confirmpassword === "") {
        regerror.confirmpasswordError = "Re-enter your password";
    }
    else if (password!=confirmpassword) {
        regerror.confirmpasswordError = "Passwords do not match";
    }
    if (phone === "") {
        regerror.phoneError = "Enter your phone number";
    }
    else if (!PHONE_REGEX.test(phone)) {
        regerror.phoneError = "Invalid phone number. Please correct and try again.";
    }
    if (address === "") {
        regerror.addressError = "Enter your address";
    }
    else if (!ADDRESS_REGEX.test(address)) {
        regerror.addressError = "Invalid address. Please correct and try again.";
    }

    if (regerror.emailError || regerror.passwordError || regerror.nameError || regerror.phoneError || regerror.addressError || regerror.confirmpasswordError) {
        console.log(regerror)

        return regerror;
    }

    return true
}

export default ValidateRegister


