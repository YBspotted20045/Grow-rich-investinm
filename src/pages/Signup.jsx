import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../styles/Auth.css';
import logo from '../assets/logo.png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Grow Rich Logo" className="auth-logo" />
        <h2>Create Your Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
