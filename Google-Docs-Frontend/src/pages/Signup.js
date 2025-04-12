import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './logister.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = () => {
    axios.post('http://localhost:3002/signup', { username, password, email })
      .then(() => {
        setVerificationSent(true);
      })
      .catch(() => {
        alert('Signup failed. Try again.');
      });
  };

  return (
    <div className='loginpage'>
      <div className="login-container">
        <h2>Create an Account 🚀</h2>
        <p className="subtitle">Join us today, it's quick and easy!</p>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Choose a username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleSignup} className='btn'>Sign Up</button>
        {verificationSent && (
          <p className="success-message">
            Email verification link sent! Check your inbox.
          </p>
        )}
        <p className="switch-link">Already have an account? <span onClick={() => navigate('/login')}>Log in</span></p>
      </div>
    </div>
  );
}

export default Signup;