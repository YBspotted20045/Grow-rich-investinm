// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";
import "./Login.css"; // optional if you style it

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // ✅ For success/error message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("gr_token", res.data.token);

      // ✅ Show success message
      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setMessage({ type: "error", text: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* ✅ Show message here */}
        {message && (
          <div
            className={`message ${message.type}`}
            style={{
              marginBottom: "10px",
              color: message.type === "success" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message.text}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
