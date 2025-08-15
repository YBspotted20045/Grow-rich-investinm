// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../style/axios"; // central axios instance
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Client-side validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.post("/api/login", { email, password });

      // Save token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setErr(error.response.data.message || "Invalid credentials");
      } else {
        setErr("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lux-login-page">
      <div className="lux-waves" />
      <div className="lux-particles">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              opacity: 0.2 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      <div className="top-logo">
        <img
          src="/logo.png"
          alt="GrowRichInvestments"
          className="top-logo-img"
        />
        <div className="logo-sweep" />
      </div>

      <div className="moving-logos">
        {[...Array(30)].map((_, i) => (
          <img
            key={i}
            src="/logo.png"
            alt="bg"
            className="mini-logo"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              transform: `scale(${0.5 + Math.random() * 0.9})`,
            }}
          />
        ))}
      </div>

      <div className="form-wrap">
        <form className="lux-form" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>

          {err && (
            <div
              className="form-error"
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.15)",
                color: "#ff4d4d",
                border: "1px solid rgba(255,0,0,0.3)",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {err}
            </div>
          )}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            minLength={6}
            required
          />

          <button className="lux-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Login"}
          </button>

          <p className="switch">
            Don’t have an account?{" "}
            <Link to="/signup" className="link-gold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
