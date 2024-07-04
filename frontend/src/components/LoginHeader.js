import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function LoginHeader(){
    return(
        <div className="login-header">
            <div>
                <a href="/"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></a>
            </div>
            <div class="menu">
            <Link to = "/about+us" className="aboutus login-menu-button"><FontAwesomeIcon icon={faInfoCircle} className="about-us-icon" />About Us</Link>
            </div>
        </div>
    );
}

export default LoginHeader;
