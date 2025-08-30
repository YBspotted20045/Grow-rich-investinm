import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to GrowRich Investments</h1>
      <p>Invest smartly, refer friends, and grow your wealth.</p>
      <div className="landing-buttons">
        <Link to="/signup" className="btn">Sign Up</Link>
        <Link to="/login" className="btn-outline">Login</Link>
      </div>
    </div>
  );
}

export default Landing;
