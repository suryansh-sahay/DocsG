import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = () => {
    // Make a POST request to the signup endpoint
    axios.post('http://localhost:3002/signup', { username, password, email })
      .then((response) => {
        // Handle successful signup and set verificationSent to true
        setVerificationSent(true);
      })
      .catch((error) => {
        // Handle signup error
      });
  };

  return (
    <div className='loginpage'>
       <div className="login-container">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleSignup} className='btn'>Sign Up</button>
      {verificationSent && (
        <p className="success-message">
          Email verification link sent! Check your inbox.
        </p>
      )}
    </div>
    </div>
  );
}

export default Signup;
