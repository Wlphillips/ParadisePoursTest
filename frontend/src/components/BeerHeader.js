import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faWineGlassAlt,faCocktail,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function BeerHeader(){
    return(
        <div className="beer-header">
            <div>
                <a href="/homepage"><img src={logoImage} alt="Paradise Pours Logo" className="logo-img"></img></a>
            </div>
            <div className="menu">
                <Link to="/homepage" className="home menu-button"><FontAwesomeIcon icon={faHome} className="home-icon" />Home</Link>
                <Link to="/wine" className="wine menu-button"><FontAwesomeIcon icon={faWineGlassAlt} className="wine-icon" />Wine</Link>
                <Link to="/liquor" className="liquor menu-button"><FontAwesomeIcon icon={faCocktail} className="cocktail-icon" />Liquor</Link>
                <Link to="/" className="log menu-button"><FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />Logout</Link>
            </div>
        </div>
    );
}

export default BeerHeader;