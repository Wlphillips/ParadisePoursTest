import WineHeader from "../components/WineHeader";
import React, { useState, useEffect } from 'react';

function WinePage(){
    return(
        <div className ="wine-page">
            <div className = "wine-content">
                <WineHeader />
                <div className = "wine-box">
                    <h1>Wine</h1>
                </div>
            </div>
        </div>
    );
}

export default WinePage;