import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>WATCH WIZARD</h1>
        <p>Wear your Fashion</p>

        <p>Copyrights 2022 &copy; Sneka</p>
      </div>

      <div className="rightFooter">
        <h4>Thankyou Visit Again</h4>
      </div>
    </footer>
  );
};

export default Footer;
