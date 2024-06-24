import React from 'react';
import '../main.css';
import Header from '../components/Header.js';

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
