import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      const response = await handleLogin({ username, password });
      if (response.status === 200) {
        // Redirect to home page after successful login
        console.log('jhjdffh');
        navigate('/');
      } else {
        console.error('Login failed:', response.data); // Log error message from server
      }
    } catch (error) {
      console.error('Login failed:', error); // Log network error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
