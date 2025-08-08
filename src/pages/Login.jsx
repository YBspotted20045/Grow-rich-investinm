import React, { useState } from "react";
import "./Login.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await axios.post("/login", { email, password });
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/logo.png" alt="GrowRich Logo" className="floating-logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <span className="error">{error}</span>}

        <button type="submit">Login</button>

        <p className="signup-link">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#00a86b", cursor: "pointer", fontWeight: "bold" }}
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
