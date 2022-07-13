import {
    nameRegex,
    emailRegex,
    phoneRegex,
    passwordRegex,
    addressRegex,
  } from "./validationConstant/index.js";
// import * as regex from './validationConstant/index'

function ValidateRegister(name,email,password,phone,address) {
    const regerror = {
        nameError: "",
        emailError : "",
        passwordError : "",
        phoneError: "",
        addressError:""
    }

    const NAME_REGEX = nameRegex;
    const EMAIL_REGEX = emailRegex;
    const PHONE_REGEX = phoneRegex;
    const PASSWORD_REGEX = passwordRegex;
    const ADDRESS_REGEX = addressRegex;

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
    else if (!PHONE_REGEX.test(password)) {
        regerror.passwordError = "Minimum 7 characters required";
    }
    if (phone === "") {
        regerror.phoneError = "Enter your phone number";
    }
    else if (!PASSWORD_REGEX.test(phone)) {
        regerror.phoneError = "Invalid phone number. Please correct and try again.";
    }
    if (address === "") {
        regerror.addressError = "Enter your address";
    }
    else if (!ADDRESS_REGEX.test(address)) {
        regerror.addressError = "Invalid address. Please correct and try again.";
    }

    if (regerror.emailError || regerror.passwordError || regerror.nameError || regerror.phoneError || regerror.addressError ) {
        return regerror;
    }

    return true
}

export default ValidateRegister


