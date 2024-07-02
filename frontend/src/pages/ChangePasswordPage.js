import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AboutUsHeader from '../components/AboutUsHeader';
import '../main.css';

const ChangePasswordPage = () =>{
    const {uniqueString} = useParams()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async() =>{
        const response = await axios.post(`http://localhost:5000/api/changePassword/${uniqueString}`, {
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })

        if(response.status === 200){
            console.log('Response:', response.data.Message);  
            window.location.href='/'  
        }
        else if(response.status === 400){

        }
    }

    return(
        <div className="login-page">
            <div className="loginContent">
                <AboutUsHeader />
                <div className="welcome-message">
                    Account Recovery
                </div>
                <div className={"login-box"}>
                    <div class = "input-form">
                        <div className="label">New Password</div>
                        <input className="input-box" type="password" id="new-password" name="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <div className="label">Confirm Password</div>
                        <input className="input-box" type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type="button" onClick={handleSubmit} className="login-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordPage;