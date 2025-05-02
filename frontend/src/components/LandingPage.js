// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 
import logo from './logo.png'; // Logo import

const LandingPage = () => {
  return (
    <div className="landing">
        
      <div className="content">
        {/* Logo and Button inside a wrapper */}
        <div className="logo-button-wrapper">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/emotion">
            <button className="start-button">Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
