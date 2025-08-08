import React from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png"; // ✅ Using assets folder

const FloatingLogos = () => {
  const logoCount = 10;
  const logos = [];

  for (let i = 0; i < logoCount; i++) {
    const style = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 2}s`, // Faster
      width: "80px", // Bigger logo size
      height: "80px",
      opacity: 1, // Very bright
      filter: "brightness(4)", // 4× brightness
    };
    logos.push(
      <img
        key={i}
        src={logo}
        alt="Floating Logo"
        className="floating-logo"
        style={style}
      />
    );
  }

  return <div className="floating-logos">{logos}</div>;
};

const Login = () => {
  return (
    <div className="login-container">
      <FloatingLogos />
      <div className="login-form">
        <h2>Login to Your Account</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
