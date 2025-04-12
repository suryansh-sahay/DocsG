import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './logister.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:3002/login', { username, password }, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        navigate("/user");
      })
      .catch(() => {
        setLoginError('Invalid username or password');
      });
  };

  return (
    <div className='loginpage'>
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Please enter your login details below.</p>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className='btn'>Login</button>
        {loginError && <p className="error-message">{loginError}</p>}
        <p className="switch-link">Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span></p>
      </div>
    </div>
  );
}

export default Login;