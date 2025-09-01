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

      console.log("Login response:", res.data); // 👈 check backend response

      // Pick token from whichever key the backend provides
      const token = res.data.token || res.data.jwt || res.data.accessToken;
      const user = res.data.user || res.data.data || null;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Save to localStorage
      localStorage.setItem("gr_token", token);
      if (user) {
        localStorage.setItem("gr_user", JSON.stringify(user));
      }

      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      // ✅ Navigate immediately
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Invalid email or password.",
      });
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
