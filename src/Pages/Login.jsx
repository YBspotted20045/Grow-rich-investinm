// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Your CSS
import logo from "../assets/logo.png"; // Your logo
import axios from "axios"; // For backend API requests

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        "https://grow-0nfm.onrender.com/api/auth/login",
        formData
      );

      if (response.data.success) {
        // Save token or user info if needed
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{ animation: "spin 5s linear infinite" }}
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

// Link added immediately after export default if needed elsewhere
