import React from "react";
import img from '../../../assets/images/logo.webp';
import { ReactNavbar} from "overlay-navbar"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom'

const options = {
  burgerColorHover: "#eb4034",
  logo: img,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/#container",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
};

const Header = () => {
  
  return (
  <div>
   <div style={{display:"inline",position:"absolute",float:"right",margin:"0 0 0 80%",padding:"0 0 0 0",height:"100px"}}>
    <nav style={{float:"right",display:"inline",margin:"30% 0 0 0"}}> 
    <nav style={{float:"right",display:"inline"}}>
    <Link to='/cart' ><ShoppingCartIcon style={{fontSize:"50px"}}/></Link>
    <Link to="/login"><AccountCircleIcon style={{fontSize:"50px"}}/></Link>
    </nav>
    </nav> 

    <ReactNavbar {...options} />
        
   </div>
   </div>
  );
};

export default Header;

