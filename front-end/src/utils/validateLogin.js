import {
    EMAIL_REGEX,
    PASSWORD_REGEX,  
  } from "../constants/validationConstant/index.js";

function ValidateLogin(email, password) {
    const error = {
        loginEmailError : "",
        loginPasswordError : ""
    }

    if (email === "") {
        error.loginEmailError = "Enter your email";
    }
    else if (!EMAIL_REGEX.test(email)) {
        error.loginEmailError = "Invalid email address. Please correct and try again.";
    }

    if (password === "") {
        error.loginPasswordError = "Enter your password";
    }
    else if (!PASSWORD_REGEX.test(password)) {
        error.loginPasswordError = "Minimum 7 characters required";
    }

    if (error.loginEmailError || error.loginPasswordError) {
 
        return error;
    }

    return true
}

export default ValidateLogin