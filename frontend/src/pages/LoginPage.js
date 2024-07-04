import axios from 'axios';
import React, { useState } from 'react';
import LoginHeader from '../components/LoginHeader';
import '../main.css';

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [lastLoginAttempt, setLastLoginAttempt] = useState(true);

    const formData = isLogin ? { "Username": username, "Password": password } : { "FirstName": firstName, "LastName": lastName, "Username": username, "Password": password, "Email": email, "Phone": phone };

    async function loginButtonHandler(event){
        event.preventDefault(); // Prevent form from submitting
        const errorElement = document.getElementById('error');

        if (lastLoginAttempt) {
            errorElement.style.display = 'block';
            return;
        } else {
            errorElement.style.display = 'none';
        }

        try{
            const resp = await axios.post('http://localhost:5000/api/login', {
                Username: formData.Username,
                Password: formData.Password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(resp);
            console.log("Login Successful: ", resp);
            window.location.href = '/homepage';
            setLastLoginAttempt(true);
        }
        catch(error){
            console.log("Login failed...");
            setLastLoginAttempt(false);
        }
    }

    async function registerButtonHandler(){
        const resp = await axios.post('http://localhost:5000/api/register', {
            FirstName: formData.FirstName,
            LastName: formData.LastName, 
            Email: formData.Email, 
            Phone: formData.Phone,
            Username: formData.Username,
            Password: formData.Password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(resp);

        if(resp.status === 201){
            console.log("User Registered: ", resp);
            window.location.href = '/';
        }
        else{
            console.log("Sign up failed...");
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
                <div className={`login-box ${isLogin ? '' : 'register'}`}>
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
                        { !isLogin && (
                            <>
                                <div className="label">First Name</div>
                                <input className="input-box" type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <div className="label">Last Name</div>
                                <input className="input-box" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                <div className="label">Email</div>
                                <input className="input-box" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <div className="label">Phone</div>
                                <input className="input-box" type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </>
                        )}
                        <div className="label">Username</div>
                        <input className="input-box" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <div className="label">Password</div>
                        <input className="input-box" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="button" onClick={isLogin ? loginButtonHandler : registerButtonHandler} className="login-button">{isLogin ? "Login" : "Register"}</button>
                    <div id="error" class="login-error">Incorrect username or password<br></br>Please try again!!</div>
                    <a href="/forgotPass" class="forgot-password">{isLogin ? "Forgot Password?" : ""}</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
