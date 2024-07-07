import LiquorHeader from "../components/LiquorHeader";
import React, { useState, useEffect } from 'react';

function LiquorPage(){
    return(
        <div className ="liquor-page">
            <div className = "liquor-content">
                <LiquorHeader />
                <div class = "liquor-box">
                    <h1>Liquor</h1>
                </div>
            </div>
        </div>
    );
}

export default LiquorPage;