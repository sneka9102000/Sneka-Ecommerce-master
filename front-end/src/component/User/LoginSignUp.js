import React, { Fragment, useRef, useState, useEffect } from "react";
import "../User/User.css";
import Loader from "../layout/Loader/loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneOutlined from "@material-ui/icons/PhoneOutlined"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../../utils/validateLogin";
import ValidateRegister from "../../utils/validateRegister";



const LoginSignUp = ({ location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [nameError, setNameError] = useState("");
  let [phoneError,setPhoneError] = useState("");
  let [addressError,setAddressError] = useState("");


  let [loginEmailError, setLoginEmailError] = useState("");
  let [loginPasswordError, setLoginPasswordError] = useState("");

  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { name, email, password, phone, address} = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const validRegister = () => {
    console.log("in validate Register")

    console.log("Phone : ", phone);

    const error = ValidateRegister(name,email,password,phone,address)

    console.log("ERROR : "+error.phoneError)

    let nameError = error.nameError;
    let emailError = error.emailError;
    let passwordError = error.passwordError;
    let phoneError = error.phoneError;
    let addressError = error.addressError


    // const nameField = document.getElementById('name');
    // const emailField = document.getElementById('email');
    // const passwordField = document.getElementById('password');
    // const phoneField = document.getElementById('phone');
    // const addressField = document.getElementById('address');


    if(nameError) {
        setNameError(nameError);
    } 
    
    if(emailError) {
        setEmailError(emailError);
    }
    
    if (passwordError) {
        setPasswordError(passwordError)
    }
    if(phoneError){
        setPhoneError(phoneError)
    }
    if(addressError){
        setAddressError(addressError)
    }

    if(nameError || emailError || passwordError || phoneError || addressError) {
        return false;
    }

    return true

}

  const validLogin = () => {

    const error = ValidateLogin(loginEmail, loginPassword)

    let emailError = error.emailError;
    let passwordError = error.passwordError;

    if (emailError) {
      setLoginEmailError(emailError);
    }

    if (passwordError) {
      setLoginPasswordError(passwordError)
    }

    if (emailError || passwordError) {
      return false;
    }

    return true
  }


  const loginSubmit = (e) => {
    e.preventDefault();
    const isValid = validLogin();
    console.log(isValid)
    if (isValid) {
      dispatch(login(loginEmail, loginPassword))
    }
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const isValid = validRegister()

    console.log("Valid statement: "+isValid)

    let userObject = {
      name, email, password, address, phone, avatarPreview, avatar
    }
    
    if (isValid) {
      console.log(userObject)
      dispatch(register(userObject))
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(window.location.search ? location.search.split("=")[1] : "/account");
    }
  }, [dispatch, error, alert, isAuthenticated]);



  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };


  return (
    <div>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="LoginSignUpToggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon style={{ margin: "1% 0 0 0" }} />
              <input
                type="text"
                placeholder="Enter your Email Id"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <strong>{loginEmailError}</strong>
            </div>
            <div className="loginPassword">
              <LockOpenIcon style={{ margin: "1% 0 0 0" }} />
              <input
                type="password"
                placeholder="Enter the Password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              /><br />
              <strong >{loginPasswordError}</strong>
            </div>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName" >
              <FaceIcon style={{ margin: "1% 0 0 0" }}/>
              <input
                type="text"
                placeholder="Enter your Name"
                id="username"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
              <strong>{nameError}</strong>
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon style={{ margin: "1% 0 0 0" }}/>
              <input
                type="email"
                placeholder="Enter your Email Id"
                id="useremail"
                name="email"
                value={email}
                onChange={registerDataChange}
              />
              <strong>{emailError}</strong>
            </div>
            <div className="signUpPhone">
              <PhoneOutlined style={{ margin: "1% 0 0 0" }}/>
              <input
                type="phone"
                placeholder="Enter your Phone Number"
                id="userphone"
                name="phone"
                value={phone}
                onChange={registerDataChange}
              />
              <strong>{phoneError}</strong>
            </div>
            <div className="signUpAddress">
              <HomeOutlined style={{ margin: "1% 0 0 0" }}/>
              <input
                type="address"
                placeholder="Enter your Address"
                id="useraddress"
                name="address"
                value={address}
                onChange={registerDataChange}
              />
              <strong>{addressError}</strong>
            </div>
            <div className="signUpPassword">
              <LockOpenIcon style={{ margin: "1% 0 0 0" }} />
              <input
                type="password"
                placeholder="Enter the Password"
                id="userpassword"
                name="password"
                value={password}
                onChange={registerDataChange}
              />
              <strong>{passwordError}</strong>
            </div>

            <div id="registerImage">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp;
