import React, {useState, useEffect} from 'react';
import '../main.css';
import BeerMugsLeft from '../images/beer-mugs-left.png';
import BeerMugsRight from '../images/beer-mugs-right.png';
import axios from 'axios';
import DisplayBeer from './DisplayBeer.js';


const BeerList = ({switchComponents}) => {
    const [beers, setBeers] = useState('[]');
    const [selectedBeer, setSelectedBeer] = useState(null);
    const [showDisplayBeer, setShowDisplayBeer] = useState(false);

    function compareFn(a, b){
        if(a < b){
            return -1;
        }
        else if(a > b){
            return 1;
        }
        else{
            return 0;
        }
    }

    useEffect(() => {
        async function fetchAllBeers(){
            try {
                const response = await axios.get('http://localhost:5000/api/getAllBeers');
                let beersData = response.data.beers;
                beersData.sort((a, b) => a.Name.localeCompare(b.Name));
                setBeers(beersData);
            }
            catch(error){
                console.log("Error fetching all beers: ", error);
            }
        }

        fetchAllBeers();
    }, []);

    const handleBeerClick = (beer) => {
        setSelectedBeer(beer);
        setShowDisplayBeer(true);
    };

    
    return(
    <div class = "beer-list" id = "beerList">
        <div class = "beer-list-header">
                <img src = {BeerMugsLeft}></img>
                <h1>————— Beer  List —————</h1>
                <img src = {BeerMugsRight}></img>
        </div>
        <div class = "beer-list-content">
            <div class = "scrollable-box">
                {Array.isArray(beers) && beers.map(beer => (
                    <ul id="sortedList" class = "sorted-list" key={beer._id}>
                        <li className="list-item" onClick={() => handleBeerClick(beer)}> {beer.Name} </li>
                    </ul>
                ))}
            </div>
            {showDisplayBeer && selectedBeer && (
                <DisplayBeer beer={selectedBeer} />
            )}
        </div>

        <button onClick={switchComponents} class = "beer-list-button"><i class="bi bi-arrow-left"></i>Back</button>
    </div>
    );
}

export default BeerList;