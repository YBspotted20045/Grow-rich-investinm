// src/pages/Login.jsx
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="login-container">
      {/* Background logos */}
      <div className="logo-pattern">
        {Array.from({ length: 12 }).map((_, index) => (
          <img key={index} src={logo} alt="Logo" className="faded-logo" />
        ))}
      </div>

      {/* Login form */}
      <div className="login-form-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
