import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';

function LoginHeader(){
    return(
        <div className="header">
            <div>
                <a href="../../public/index.html"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></a>
            </div>
            <div class="menu">
            <div className="aboutus menu-button">About Us</div>
            </div>
        </div>
    );
}

export default LoginHeader;
