// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Local CSS

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1 className="logo">GrowRich Investments</h1>
        <p className="tagline">Invest, Refer & Grow Your Wealth</p>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Build Wealth With Confidence</h2>
        <p>
          Join thousands already growing their wealth with GrowRich.
          Secure investments, trusted system, and referral rewards.
        </p>
      </section>

      {/* Actions */}
      <section className="actions">
        {/* Login Card */}
        <div className="card dark-card">
          <h3>Already a Member?</h3>
          <Link to="/login" className="btn gold-btn">
            Login
          </Link>
        </div>

        {/* Signup Card */}
        <div className="card light-card">
          <h3>Sign Up Today</h3>
          <Link to="/signup" className="btn black-btn">
            Sign Up
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} GrowRich Investments. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
