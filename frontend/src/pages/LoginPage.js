import React from 'react';
import LoginHeader from '../components/LoginHeader';
import '../main.css';

function LoginPage() {
    return (
        <div className="login-page">
            <div className="loginContent"> 
                <LoginHeader />
                <div className="welcome-message">
                    Welcome to Paradise Pours - Your Ultimate Alcohol Database!
                </div>
                <div className="login-box">
                    <h2>Login / Register</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                            <button type="submit" className="login-button">Login</button>
                            <button type="button" className="register-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
