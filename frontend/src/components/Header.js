import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';


function Header(){
    return(
        <div className="header">
            <div>
                <Link to="/"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></Link>
            </div>
            <div class="menu">
                <Link to="/beer" className="beer menu-button">Beer</Link>
                <Link to="/wine" className="wine menu-button">Wine</Link>
                <Link to="/liquor" className="liquor menu-button">Liquor</Link>
                <Link to="/login" className="log menu-button">Login/Register</Link>
            </div>
        </div>
    );
}

export default Header;
