import React from 'react';
import '../main.css';
import AboutUs from '../components/AboutUs.js';
import AboutUsHeader from '../components/AboutUsHeader.js';

const AboutUsPage = () => {
  return (
    <div className="home-page">
      <div className="content" >
        <AboutUsHeader />
        <AboutUs />
      </div>
    </div>
  );
};

export default AboutUsPage;
