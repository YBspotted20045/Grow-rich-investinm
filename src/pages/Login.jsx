import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Floating logos array
  const floatingLogos = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${5 + Math.random() * 5}s`,
  }));

  return (
    <div className="login-container">
      {/* Floating background logos */}
      {floatingLogos.map((logo) => (
        <img
          key={logo.id}
          src="/logo.png"
          alt="Floating Logo"
          className="floating-logo"
          style={{
            top: logo.top,
            left: logo.left,
            animationDuration: logo.duration,
          }}
        />
      ))}

      {/* Main logo */}
      <div className="main-logo-wrapper">
        <img src="/logo.png" alt="Main Logo" className="main-logo" />
      </div>

      {/* Login form */}
      <form className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button type="submit">Login</button>

        {/* Link to Signup */}
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
