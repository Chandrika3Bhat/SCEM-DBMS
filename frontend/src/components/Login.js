import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for redirection
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  // Send email and password
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        navigate('/events');  // Redirect to the events page on successful login
      } else {
        alert(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Capture email input
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Capture password input
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
