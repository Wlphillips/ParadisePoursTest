import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';


function AboutUsHeader(){
    return(
        <div className="header">
            <div>
                <Link to="/"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></Link>
            </div>
            <div class="menu">
                <Link to="/" className="log menu-button"><i class="bi bi-arrow-left"></i>Back</Link>
            </div>
        </div>
    );
}

export default AboutUsHeader;