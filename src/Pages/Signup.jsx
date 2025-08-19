// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import logo from "../assets/logo.png";
import API from "../axios"; // ✅ import centralized axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    state: "",
    referralCode: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      setSubmitting(false);
      return;
    }

    if (parseInt(formData.age) < 18) {
      alert("You must be at least 18 years old");
      setSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      // ✅ Real API call to backend
      const res = await API.post("/auth/signup", formData);
      alert(res.data.message || "Signup successful!");
      window.location.href = "/login"; // redirect to login
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{ animation: "spin 5s linear infinite" }}
      />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          disabled={submitting}
          required
        >
          <option value="">Select Your State</option>
          {/* your states list here */}
        </select>
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          value={formData.referralCode}
          onChange={handleChange}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
