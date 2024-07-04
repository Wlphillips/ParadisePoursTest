import React, {useEffect} from 'react';
import axios from 'axios';
import '../main.css';
import Header from '../components/Header.js';
import AboutUs from '../components/AboutUs.js';

const HomePage = () => {

  useEffect(() => {
    const getUser = async() => {
        try{
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:5000/api/user')
            console.log(response.data)
            if(response){
              localStorage.setItem('user', JSON.stringify(response.data))
            }
        }
        catch (error){
            console.error("Issues retrieving user")
        }
    }
    getUser()
}, [])

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
