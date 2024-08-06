import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Import CSS for the RegisterPage

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully') {
        // Redirect to login page on successful registration
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setMessage('Error registering user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
