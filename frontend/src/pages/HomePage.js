import React from 'react';
import '../main.css';
import Header from '../components/Header.js';
import AboutUs from '../components/AboutUs.js';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content" >
        <Header />
        <AboutUs />
      </div>
    </div>
  );
};

export default HomePage;
