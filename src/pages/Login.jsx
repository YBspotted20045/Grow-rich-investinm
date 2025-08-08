import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";
import logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/users/login", formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard"); // go to user dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="logo-wall">
        {Array.from({ length: 30 }).map((_, i) => (
          <img key={i} src={logo} alt="logo" className="faint-logo" />
        ))}
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="GrowRich Logo" className="main-logo" />
        <h2>Welcome Back</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          Don’t have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
