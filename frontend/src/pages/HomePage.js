import React from 'react';
import '../main.css';
import beerImage from '../images/Home_pouring_beer.jpg';
import Header from '../components/Header.js';
import beerTap from '../images/Beer_Tap.png'
import beerHead from '../images/Beer_Head.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content" >
        <Header />

        <div className="about-us">ABOUT US</div>
        <div className="beer-of-the-day">Beer Of The day</div>

      </div>
    </div>
  );
};

export default HomePage;
