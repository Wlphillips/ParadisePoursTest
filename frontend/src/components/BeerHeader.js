import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';

function BeerHeader(){
    return(
        <div className="beer-header">
            <div>
                <a href="/homepage"><img src={logoImage} alt="Paradise Pours Logo" class="logo-img"></img></a>
            </div>
            <div class="menu">
            <Link to = "/homepage" className="beer-menu-button"><i class="bi bi-arrow-left"></i>Back</Link>
            </div>
        </div>
    );
}

export default BeerHeader;