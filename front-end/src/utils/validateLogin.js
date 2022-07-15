
function ValidateLogin(email, password) {
    const error = {
        loginEmailError : "",
        loginPasswordError : ""
    }

    const emailRegex = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/;
    const passwordRegex = /^[A-Za-z0-9]{7,15}$/;

    if (email === "") {
        error.loginEmailError = "Enter your email";
    }
    else if (!emailRegex.test(email)) {
        error.loginEmailError = "Invalid email address. Please correct and try again.";
    }

    if (password === "") {
        error.loginPasswordError = "Enter your password";
    }
    else if (!passwordRegex.test(password)) {
        error.loginPasswordError = "Minimum 7 characters required";
    }

    if (error.loginEmailError || error.loginPasswordError) {
        console.log("error",error)
        return error;
    }

    return true
}

export default ValidateLogin