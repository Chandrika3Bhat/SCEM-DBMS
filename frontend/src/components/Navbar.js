import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjFPan00kA8_OD53gCGoILOHr3PKnhTOFXA&s" 
          alt="College Logo" 
          className="college-logo" 
        />
        <h2 className="college-name">SAHYADRI EVENT HUB</h2>
      </div>
      
      <div className="auth-links">
        <Link to="/">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </header>
  );
}

export default Navbar;
