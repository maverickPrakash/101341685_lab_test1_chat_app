import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

const RegisterPage = ({ handleRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    create_on: new Date().toISOString() // Assuming you want to capture registration time
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
