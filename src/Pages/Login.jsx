import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios";
import "./Login.css"; // ✅ make sure you have this CSS file for styles

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data.token) {
        // ✅ Save token
        localStorage.setItem("gr_token", res.data.token);
        console.log("Saved token:", res.data.token);

        // ✅ Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your email & password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="brand">GrowRich</h2>
        <h3>Login</h3>
        <p className="muted">Enter your details to access your account</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="gold-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="muted mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
