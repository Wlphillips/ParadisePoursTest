import React, { useEffect } from 'react';
import '../main.css';
import BeerMugsLeft from '../images/beer-mugs-left.png';
import BeerMugsRight from '../images/beer-mugs-right.png';

function BeerOfTheDay(){

    return(
        <div class = "beer-of-the-day" id = "BOTD">
            <div>
                <img src = {BeerMugsLeft}></img>
                <h1>——— Beer of the Day ———</h1>
                <img src = {BeerMugsRight}></img>
            </div>
            <div class = "botd-content">
            <div class = "botd-nutri-values">
                <h2>
                    Name : "_______"
                </h2>
                <div class = "grid">
                    <div class = "grid-item">Company:<br></br> _______</div>
                    <div class = "grid-item">Stlye:<br></br>_______</div>
                    <div class = "grid-item">ABV:<br></br>_______</div>
                    <div class = "grid-item">Calories:<br></br>_______</div>
                    <div class = "grid-item">Origin:<br></br>_______</div>
                    <div class = "grid-item">Favorite?<br></br>_______</div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default BeerOfTheDay;