import React from 'react'; 

const DisplayBeer = ({beer}) => {
    return(
        <div class = "display-beer">
            <h1>{beer.Name}</h1>
            <div class = "beer-info">
                <h1 class = "beer-info-header">Company: </h1> <p>{beer.Company}</p>
                <h1 class = "beer-info-header">Style:</h1> <p>{beer.Style}</p>
                <h1 class = "beer-info-header">ABV:</h1> <p>{beer.ABV}</p>
                <h1 class = "beer-info-header">Calories:</h1> <p>{beer.Calories}</p>
                <h1 class = "beer-info-header">Origin:</h1> <p>{beer.Origin}</p>
                <h1 class = "beer-info-header">Favorite:</h1><p><button className="fav-icon">{beer.Favorite ? <i className = "bi bi-heart-fill fav-icon"></i> : <i className = "bi bi-heart fav-icon"></i>}</button></p>
            </div>
        </div>
    );
}

export default DisplayBeer;