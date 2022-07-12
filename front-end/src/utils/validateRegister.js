function ValidateRegister(name,email, password) {
    const regerror = {
        nameError: "",
        emailError : "",
        passwordError : ""
    }

    const nameRegex = /^[a-zA-Z]{1,15}$/;
    const emailRegex = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^[A-Za-z0-9]{3,15}$/;


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

    if (regerror.emailError || regerror.passwordError) {
        return regerror;
    }

    return true
}

export default ValidateRegister


