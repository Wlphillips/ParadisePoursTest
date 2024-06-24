import React from 'react';
import '../main.css';
import beerImage from '../images/Home_pouring_beer.jpg';
import Header from '../components/Header.js';
import beerTap from '../images/Beer_Tap.png'
import beerHead from '../images/Beer_Head.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="content" >
        
        <img src = {beerTap} alt = "Beer Tap" class = "beerTap"></img>

        <div className="about-us">ABOUT US</div>
        <div className="beer-of-the-day">Beer Of The day</div>

        <div>
          <img class ="beerFooter" src = {beerHead} alt = "Beer Head"></img>
        </div>

      </div>
      
      {/* <div className="image-container">
        <img src={beerImage} alt="Beer" className="beer-image" />
      </div> */}
    </div>
  );
};

export default HomePage;
