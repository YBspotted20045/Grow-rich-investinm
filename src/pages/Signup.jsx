import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import './Signup.css'; // ✅ Make sure Signup.css is in the same folder

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.success) {
        navigate('/verify-email');
      } else {
        setError(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
