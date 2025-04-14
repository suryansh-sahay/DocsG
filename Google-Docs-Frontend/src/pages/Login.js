import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './logister.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim()) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = 'Username cannot be empty';
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password cannot be empty';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;

    axios.post('http://localhost:3002/login', formData, { withCredentials: true })
      .then((response) => {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/user");
        }, 1500); // Short delay before navigation
      })
      .catch((err) => {
        setLoginError(err.response?.data?.message || 'Invalid username or password');
      });
  };

  return (
    <div className='loginpage'>
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Please enter your login details below.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button type="submit" className='btn'>Login</button>
          
          {loginError && <p className="error-message">{loginError}</p>}
          {loginSuccess && (
            <div className="success-message">
              Login successful! Redirecting...
            </div>
          )}
        </form>
        
        <p className="switch-link">
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;