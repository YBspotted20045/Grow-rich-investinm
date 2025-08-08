// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!/\S+@\S+\.\S+/.test(email)) return setErr("Please enter a valid email.");
    if (password.length < 8) return setErr("Password must be at least 8 characters.");

    setLoading(true);
    // simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Login successful (demo)");
    }, 1800);
  };

  return (
    <div className="lux-login-page">
      {/* decorative layers */}
      <div className="lux-waves" />
      <div className="lux-particles">
        {[...Array(25)].map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random()*100}%`,
            top: `${Math.random()*100}%`,
            animationDuration: `${6 + Math.random()*8}s`,
            opacity: 0.2 + Math.random()*0.6
          }} />
        ))}
      </div>

      {/* Top center big logo */}
      <div className="top-logo">
        <img src="/logo.png" alt="GrowRichInvestments" className="top-logo-img" />
        <div className="logo-sweep" />
      </div>

      {/* Moving small logos */}
      <div className="moving-logos">
        {[...Array(30)].map((_, i) => (
          <img
            key={i}
            src="/logo.png"
            alt="bg"
            className="mini-logo"
            style={{
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              animationDuration: `${8 + Math.random()*12}s`,
              transform: `scale(${0.5 + Math.random()*0.9})`
            }}
          />
        ))}
      </div>

      {/* Frosted form */}
      <div className="form-wrap">
        <form className="lux-form" onSubmit={handleSubmit}>
          <h2>Welcome back</h2>
          {err && <div className="form-error">{err}</div>}

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            disabled={loading}
            minLength={8}
            required
          />

          <button className="lux-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : "Login"}
          </button>

          <p className="switch">
            Don’t have an account? <Link to="/signup" className="link-gold">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
