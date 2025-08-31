// src/Pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="hero">
        <h1>GrowRich Investments</h1>
        <p>Invest, Refer, and Grow Your Wealth Securely.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn primary">Get Started</Link>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>💸 Easy Investments</h3>
          <p>Start with ₦5,000, ₦10,000, or ₦15,000 and watch your money grow.</p>
        </div>
        <div className="feature-card">
          <h3>🤝 Referral Rewards</h3>
          <p>Invite friends and earn commissions when they invest.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure & Reliable</h3>
          <p>Your data and investments are safe with our system.</p>
        </div>
      </div>
    </div>
  );
}
