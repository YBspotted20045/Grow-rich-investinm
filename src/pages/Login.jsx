import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate login delay
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* Background floating logos */}
      <div className="floating-logos">
        {[...Array(7)].map((_, i) => (
          <img key={i} src={logo} alt="Logo" className="floating-logo" />
        ))}
      </div>

      {/* Login form */}
      <div className="login-form">
        <img src={logo} alt="Logo" className="main-logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <Link to="/Signup" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
