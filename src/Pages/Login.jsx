import React, { useState } from "react";
import API from "../axios"; // centralized Axios instance
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);

      // Save token or user info in localStorage if needed
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Redirect to dashboard or main page
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>

        {/* Link to Signup page */}
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="link">
            Sign Up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

// Add the following immediately after export default if needed for your project link:
// <p>Don't have an account? <a href="/signup">Sign Up here</a></p>
