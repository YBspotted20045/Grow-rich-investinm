import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login successful (demo)");
    }, 2000);
  };

  return (
    <div className="login-page">
      {/* Moving logos */}
      <div className="moving-logos">
        {[...Array(15)].map((_, i) => (
          <img
            key={i}
            src="/logo.png"
            alt="logo"
            className="floating-logo"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Transparent login form */}
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}
