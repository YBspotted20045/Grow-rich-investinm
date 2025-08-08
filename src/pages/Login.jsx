import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Generate multiple animated logos
    const newLogos = Array.from({ length: 10 }, () => ({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: 10 + Math.random() * 5, // 10 to 15s
    }));
    setLogos(newLogos);
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      alert('Login successful');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Animated logos in the background */}
      <div className="animated-logo-background">
        {logos.map((item, idx) => (
          <img
            key={idx}
            src={logo}
            alt="floating-logo"
            className="floating-logo"
            style={{
              top: item.top,
              left: item.left,
              animationDuration: `${item.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Login form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="GrowRich Logo" className="main-logo" />
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account? <Link to="/Signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
