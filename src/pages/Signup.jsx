import React, { useState } from 'react';
import axios from '../axios';
import './Signup.css';
import logo from '../assets/logo.png';

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await axios.post('/api/users/register', {
        fullName: formData.fullName,
        age: formData.age,
        state: formData.state,
        email: formData.email,
        password: formData.password
      });

      console.log("Signup success:", res.data);
      // Optionally redirect or show success message here
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" style={{ width: '70px', marginBottom: '1rem', opacity: 0.8 }} />
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          disabled={loading}
          required
        >
          <option value="">Select State</option>
          {statesOfNigeria.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Signup;
