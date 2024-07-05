import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../main.css';
import Header from '../components/Header.js';
import AboutUs from '../components/AboutUs.js';

const HomePage = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const getUser = async() => {
        try{
            const response = await axios.get('http://localhost:5000/api/user',
              {
                withCredentials: true,
              }
            )
            console.log(response.data)
            if(response.status === 200){
              console.log(response)
              setUser(response.data.User)
            }
        }
        catch (error){
            console.error("Issues getting user")
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
