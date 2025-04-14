import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./logister.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (value.trim()) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Check each field
    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    axios
      .post("http://localhost:3002/signup", formData)
      .then(() => {
        setFormData({ username: "", password: "", email: "" });
        setVerificationSent(true);
        setTimeout(() => setVerificationSent(false), 2000);
      })
      .catch((err) => {
        setErrors({
          ...errors,
          server: err.response?.data?.message || "Signup failed. Try again.",
        });
      });
  };

  return (
    <div className="loginpage">
      <div className="login-container">
        <h2>Create an Account 🚀</h2>
        <p className="subtitle">Join us today, it's quick and easy!</p>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Choose a username"
              onChange={handleChange}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create a password"
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {errors.server && <p className="error-message">{errors.server}</p>}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        {verificationSent && (
          <div className="success-message">
            Email verification link sent! Check your inbox.
          </div>
        )}
        <p className="switch-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
