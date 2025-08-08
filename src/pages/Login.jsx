import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please fill in all fields.");
    }

    try {
      await API.post("/auth/login", formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="floating-logos"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/logo.png" alt="Logo" className="form-logo" />

        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="switch-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
