import React from 'react';
import '../main.css';
import Header from '../components/Header.js';
import BeerOfTheDay from '../components/BeerOfTheDay.js';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content" >
        <Header />
        <BeerOfTheDay />
      </div>
    </div>
  );
};

export default HomePage;
