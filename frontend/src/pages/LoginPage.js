import React from 'react';
import LoginHeader from '../components/LoginHeader';
import '../main.css';
import { useState } from 'react';

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const formData = {
        "Username": username,
        "Password": password
    }

    async function loginButtonHandler(){
        const resp = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(resp.ok){
            console.log("Login Successful: ", resp);
            window.location.href = '/homepage';
        }
        else{
            console.log("Login failed...");
        }
    }

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    return(
        <div className="login-page">
            <div className="loginContent">
                <LoginHeader />
                <div className="welcome-message">
                    Welcome to Paradise Pours - Your Ultimate Alcohol Database!
                </div>
                <div class = "login-box">
                    <div className="toggle-container">
                        <div className="switch-container">
                            <label className="switch">
                                <input type="checkbox" checked={!isLogin} onChange={handleToggle} />
                                <span className="slider">
                                    <span className="slider-label login-label">Login</span>
                                    <span className="slider-label register-label">Register</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class = "input-form">
                        <div class = "label">Username</div>
                        <input class = "input-box" type="username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div class = "input-form">
                        <div class = "label">Password</div>
                        <input class = "input-box" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="button" onClick={loginButtonHandler} className="login-button">{isLogin ? "Login" : "Register"}</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
