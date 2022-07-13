function ValidateRegister(name,email,password,phone,address) {
    const regerror = {
        nameError: "",
        emailError : "",
        passwordError : "",
        phoneError: "",
        addressError:""
    }

    const nameRegex = /^[a-zA-Z]{1,15}$/;
    const emailRegex = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^[A-Za-z0-9]{3,15}$/;
    const phoneRegex=/^[6-9]{1}[0-9]{9}$/;
    const addressRegex=/^[A-Za-z0-9]\.\-\s\]/;

    if (name === "") {
        regerror.nameError = "Enter your name";
    }
    else if (!nameRegex.test(name)) {
        regerror.nameError = "Invalid name . Please correct and try again.";
    }
 
    if (email === "") {
        regerror.emailError = "Enter your email";
    }
    else if (!emailRegex.test(email)) {
        regerror.emailError = "Invalid email address. Please correct and try again.";
    }

    if (password === "") {
        regerror.passwordError = "Enter your password";
    }
    else if (!passwordRegex.test(password)) {
        regerror.passwordError = "Minimum 7 characters required";
    }
    if (phone === "") {
        regerror.phoneError = "Enter your phone number";
    }
    else if (!phoneRegex.test(phone)) {
        regerror.phoneError = "Invalid phone number. Please correct and try again.";
    }
    if (address === "") {
        regerror.addressError = "Enter your address";
    }
    else if (!addressRegex.test(address)) {
        regerror.addressError = "Invalid address. Please correct and try again.";
    }

    if (regerror.emailError || regerror.passwordError || regerror.nameError || regerror.phoneError || regerror.addressError ) {
        return regerror;
    }

    return true
}

export default ValidateRegister


