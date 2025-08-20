import React, { useState } from "react";
import API from "../axios"; // your axios instance
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading} // disable while loading
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // disable while loading
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner"></span> // spinner animation
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <div className="link">
        <a href="/signup">Don’t have an account? Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
