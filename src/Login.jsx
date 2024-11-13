import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      // If an access token exists, navigate directly to the profile page
      navigate('/profile');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  
    try {
        const response = await axios.post("http://localhost:8000/login/", { username: email, password: password });
        const { user, access, refresh } = response.data;

        // Store the tokens and user information in localStorage
        localStorage.setItem('user', user);
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        console.log('Login successful:', access);
        navigate('/profile');
       
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
      <img src='https://tse1.mm.bing.net/th/id/OIP.isVMpTMato6mGHNCmig8aQHaDD?rs=1&pid=ImgDetMain' alt="Login illustration"/>
    </div>
  );
};

export default Login;
