import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      {/* Floating animated logos */}
      {[...Array(6)].map((_, i) => (
        <img
          key={i}
          src="/logo.png"
          alt="logo"
          className="floating-logo"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      {/* Login Card */}
      <div className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#0a7e07' }}>
          Login to GrowRich
        </h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        <div className="link">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
