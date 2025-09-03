import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        ✖
      </button>
      <ul>
        <li><a href="/dashboard">📊 Dashboard</a></li>
        <li><a href="/invest">💸 Invest</a></li>
        <li><a href="/deposit">💳 Deposit</a></li>
        <li><a href="/withdrawal">🏧 Withdraw</a></li>
        <li><a href="/account">👤 Account</a></li>
        <li><a href="/referrals">🧑‍🤝‍🧑 Referrals</a></li>
        <li><a href="/vendors">🏬 Vendors</a></li>
        <li><a href="/logout">🚪 Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
