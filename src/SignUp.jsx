import React, { useState } from 'react';
import axios from 'axios';
import './Login';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData={
      username:email,
      password:password,
    }
    try{
      const response= await axios.post('http://127.0.0.1:8000/signup/',userData);
      console.log('UserData',response.data)
    }catch(error){
      console.log('SignUp Failed:',error)
    }
    console.log('Signing up with:', { email, password });
    
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
      <img src='https://tse1.mm.bing.net/th/id/OIP.isVMpTMato6mGHNCmig8aQHaDD?rs=1&pid=ImgDetMain'/>
    </div>
  );
};

export default SignUp;
