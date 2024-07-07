import React, {useState, useEffect} from 'react';
import '../main.css';
import BeerMugsLeft from '../images/beer-mugs-left.png';
import BeerMugsRight from '../images/beer-mugs-right.png';
import axios from 'axios';
import DisplayBeer from './DisplayBeer.js';


const BeerList = ({switchComponents}) => {
    const [beers, setBeers] = useState([]);
    const [selectedBeer, setSelectedBeer] = useState(null);
    const [showDisplayBeer, setShowDisplayBeer] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // This effect will run whenever searchResults changes
        console.log(searchResults);
    }, [searchResults]);

    // useEffect(() => {

    // }, [beers]);

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

    const [text, setText] = useState('');
    const [validSearch, setValidSearch] = useState(true);

    const handleBlur = () => {
        if(text == ''){
            document.getElementById('beer-search-bar').value = 'Search';
        }
    }

    const handleFocus = () => {
        console.log(beers);
        if(text.length == 0){
            document.getElementById('beer-search-bar').value = '';
        }
    }

    async function handleSearch(){
        document.getElementById('beer-search-bar').value = 'Search';

        const resp = await axios.post('http://localhost:5000/api/searchBeer', {
            Name: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(resp.status == 200){
            setValidSearch(true);
            // let searchData = resp.data;
            setSearchResults(resp.data.beer);
            setText('');
        }
        else{
            setValidSearch(false);
            setText('');
        }
    }

    async function handleSearchBackButton(){
        setSearchResults();
        setValidSearch(true);
        setShowDisplayBeer(!showDisplayBeer);
    }

    return(
    <div className = "beer-list" id = "beerList">
        <div className = "beer-list-header">
                <img src = {BeerMugsLeft}></img>
                <h1>————— Beer  List —————</h1>
                <img src = {BeerMugsRight}></img>
        </div>
        <div className = "search-and-filter">
            <input id = "beer-search-bar" defaultValue = "Search" className = "search-bar" type="text" onChange={(e) => setText(e.target.value)} onBlur = {handleBlur} onFocus = {handleFocus}/>
            <button className = "search-button" onClick = {handleSearch} >Search</button>
        </div>
        <div className = "beer-list-content">
            <div className = "scrollable-box">
                {/* <p>searchResults : {searchResults.data}<br></br>validSearch: {validSearch.value}</p> */}

                {validSearch ? (searchResults.length === 0 ?
                                    (Array.isArray(beers) && beers.map(beer => (
                                        <ul id="sortedList" className = "sorted-list" key={beer._id}>
                                            <li className="list-item" onClick={() => handleBeerClick(beer)}> {beer.Name} </li>
                                        </ul>
                ))) :
                                    (Array.isArray(searchResults) && searchResults.map(beer => (
                                        <ul id="sortedList" className = "sorted-list" key={beer._id}>
                                            <li className="list-item" onClick={() => handleBeerClick(beer)}> {beer.Name} </li>
                                        </ul>
                                    )))) :
                       (<div>
                       <ul className = "sorted-list">
                            <li className="no-matches-message" > No beers matched with the criteria <br></br><i className="bi bi-emoji-frown"></i> </li>
                       </ul>
                       <button className = "search-back-button" onClick = {handleSearchBackButton}><i className="bi bi-arrow-left"></i>Back</button>
                       </div>)
            }



            </div>
            {validSearch && showDisplayBeer && selectedBeer && (
                <DisplayBeer beer={selectedBeer} />
            )}
        </div>

        <button onClick={switchComponents} className = "beer-list-button"><i className="bi bi-arrow-left"></i>Back</button>
    </div>
    );
}

export default BeerList;