import '../main.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavButton = (beerName) =>{
    return(
        <div className="grid-item"><h1 className = "grid-header">Favorite?</h1><br /><i className = "bi bi-heart fav-icon"></i></div>
    )
}

export default FavButton;