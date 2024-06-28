import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.js';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BeerPage from './pages/BeerPage.js';
import LiquorPage from './pages/LiquorPage.js';
import WinePage from './pages/WinePage.js';
import AboutUsPage from './pages/AboutUsPage.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LoginPage />}> </Route>
        <Route path= "/beer" element={<BeerPage />}></Route>
        <Route path="/wine" element={<WinePage />}></Route>
        <Route path="/liquor" element={<LiquorPage />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/about+us" element={<AboutUsPage />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
