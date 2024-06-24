import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Router, Routes, Route, Link} from "react-router-dom";
import BeerPage from './pages/BeerPage.js';
import LiquorPage from './pages/LiquorPage.js';
import WinePage from './pages/WinePage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<HomePage />}> </Route>
        <Route path= "/beer" element={<BeerPage />}></Route>
        <Route path="/wine" element={<WinePage />}></Route>
        <Route path="/liquor" element={<LiquorPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
