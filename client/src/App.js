import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navigation from './components/Navigation'; // Import the Navigation component
import HomePage from './components/HomePage'; 


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Define user state

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:1166/user/login', credentials);
      if (response.status === 200) {
        setLoggedIn(true);
        console.log(response.data)
        setUser(response.data); // Set the user state with data from response
      }
      return response; // Make sure to return the response
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null); // Clear the user state on logout
  };

  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:1166/user/signup', userData);
      if (response.status === 200) {
        setLoggedIn(true);
        setUser(response.data.user); // Set the user state with data from response
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Router>
      <Navigation loggedIn={loggedIn} handleLogout={handleLogout} /> {/* Pass loggedIn state and handleLogout function to Navigation */}
      <Routes>
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage handleRegister={handleRegister} />} />
        {loggedIn && <Route path="/" element={<HomePage user={user} />} />} {/* Route for home page when logged in */}
      </Routes>
    </Router>
  );
}

export default App;
