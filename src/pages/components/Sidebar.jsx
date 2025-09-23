import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">User Menu</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/deposit">Deposit</Link></li>
        <li><Link to="/withdraw">Withdraw</Link></li>
        <li><Link to="/investment">Investments</Link></li>
        <li><Link to="/referrals">Referrals</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
