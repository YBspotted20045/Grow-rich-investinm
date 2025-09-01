// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

      // Save token + user
      localStorage.setItem("gr_token", res.data.token);
      localStorage.setItem("gr_user", JSON.stringify(res.data.user));

      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      // ✅ Navigate immediately (no redirect loop)
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
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

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

        <p className="switch-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
