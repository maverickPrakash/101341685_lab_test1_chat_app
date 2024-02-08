// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ loggedIn, handleLogout }) => {
  return (
    <nav>
      <ul>
        {!loggedIn && <li><Link to="/login">Login</Link></li>}
        {!loggedIn && <li><Link to="/register">Register</Link></li>}
        {loggedIn && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
   
      </ul>
    </nav>
  );
};

export default Navigation;
