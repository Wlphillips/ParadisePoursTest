import React from 'react';
import LoginHeader from '../components/LoginHeader';
import '../main.css';
import { useState } from 'react';

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    return(
        <div className="login-page">
            <div className="loginContent">
                <LoginHeader />
                <div className="welcome-message">
                    Welcome to Paradise Pours - Your Ultimate Alcohol Database!
                </div>
                <div class = "login-box">
                    <h1>Login / Register</h1>
                    <div class = "input-form">
                        <div class = "label">Username</div>
                        <input class = "input-box" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div class = "input-form">
                        <div class = "label">Password</div>
                        <input class = "input-box" type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="button" onClick={loginButtonHandler} className="login-button">Login</button>
                    <button type="button" className="register-button">Register</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;