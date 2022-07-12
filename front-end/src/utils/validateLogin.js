
function ValidateLogin(email, password) {
    const error = {
        emailError : "",
        passwordError : ""
    }

    const emailRegex = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^[A-Za-z0-9]{7,15}$/;

    if (email === "") {
        error.emailError = "Enter your email";
    }
    else if (!emailRegex.test(email)) {
        error.emailError = "Invalid email address. Please correct and try again.";
    }

    if (password === "") {
        error.passwordError = "Enter your password";
    }
    else if (!passwordRegex.test(password)) {
        error.passwordError = "Minimum 7 characters required";
    }

    if (error.emailError || error.passwordError) {
        return error;
    }

    return true
}

export default ValidateLogin