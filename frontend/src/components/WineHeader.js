import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';

function WineHeader(){
    return(
        <div className="wine-header">
            <div>
                <a href="/"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></a>
            </div>
            <div class="menu">
            <div className="aboutus wine-menu-button">About Us</div>
            </div>
        </div>
    );
}

export default WineHeader;
