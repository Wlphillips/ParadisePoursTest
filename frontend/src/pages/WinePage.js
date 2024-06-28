import WineHeader from "../components/WineHeader";
import React, { useState, useEffect } from 'react';

function WinePage(){
    return(
        <div class ="wine-page">
            <div class = "wine-content">
                <WineHeader />
                <div class = "wine-box">
                    <h1>Wine</h1>
                </div>
            </div>
        </div>
    );
}

export default WinePage;