import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    referralCode: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await API.post('/auth/signup', form);
      navigate('/verify');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Create Account</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (Optional)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={form.referralCode}
          onChange={handleChange}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
