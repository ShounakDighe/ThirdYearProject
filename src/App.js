import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage'; // Import the RegisterPage component

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      setLoginMessage(response.data.message);
      if (response.data.success) {
        navigate('/homepage'); // Navigate to the homepage route on successful login
      }
    } catch (error) {
      setLoginMessage('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
      <Link to="/register" className="register-link">Register</Link>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Register page route */}
      </Routes>
    </Router>
  );
}

export default AppWrapper;
