import React from 'react';
import '../components/HomePage.css';
import beerImage from '../images/Home_pouring_beer.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header">
        <div className="menu">Menu</div>
        <div className="beer">Beer</div>
        <div className="liquor">Liquor</div>
        <div className="wine">Wine</div>
      </div>
      <div className="content">
        <div className="about-us">ABOUT US</div>
        <div className="beer-of-the-day">Beer Of The day</div>
      </div>
      <div className="image-container">
        <img src={beerImage} alt="Beer" className="beer-image" />
      </div>
    </div>
  );
};

export default HomePage;
