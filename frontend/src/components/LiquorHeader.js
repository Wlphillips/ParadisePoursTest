import React from 'react';
import logoImage from "../images/Paradise_Pours_Logo_Circle.png";
import '../main.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faBeer,faWineGlassAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function LiquorHeader(){
    return(
        <div className="liquor-header">
            <div>
                <a href="/homepage"><img src={logoImage} alt="Paradise Pours Logo" className="logo-img"></img></a>
            </div>
            <div className="menu">
                <Link to="/homepage" className="home menu-button"><FontAwesomeIcon icon={faHome} className="home-icon" />Home</Link>
                <Link to="/beer" className="beer menu-button"><FontAwesomeIcon icon={faBeer} className="beer-icon" />Beer</Link>
                <Link to="/wine" className="wine menu-button"><FontAwesomeIcon icon={faWineGlassAlt} className="wine-icon" />Wine</Link>
                <Link to="/" className="log menu-button"><FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />Logout</Link>
            </div>
        </div>
    );
}

export default LiquorHeader;
