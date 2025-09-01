// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("gr_token", res.data.token);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage({ type: "error", text: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required disabled={loading} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required disabled={loading} />

        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
