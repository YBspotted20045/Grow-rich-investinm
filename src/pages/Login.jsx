import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 2000);
  };

  return (
    <div className="login-page">
      {/* Stagnant logo at top */}
      <div className="top-logo">
        <img src="/logo.png" alt="Main Logo" />
      </div>

      {/* Moving background logos */}
      <div className="moving-logos">
        {[...Array(15)].map((_, index) => (
          <img
            key={index}
            src="/logo.png"
            alt="Background Logo"
            className="moving-logo"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Login form */}
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
