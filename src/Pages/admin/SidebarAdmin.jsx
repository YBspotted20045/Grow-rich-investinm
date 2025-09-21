// src/Pages/admin/SidebarAdmin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar-admin ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2 className="sidebar-title">Admin Panel</h2>}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </button>
      </div>

      <ul className="sidebar-menu">
        <li><Link to="/admin/dashboard">📊 {isOpen && "Dashboard"}</Link></li>
        <li><Link to="/admin/users">👥 {isOpen && "Manage Users"}</Link></li>
        <li><Link to="/admin/deposits">💰 {isOpen && "Manage Deposits"}</Link></li>
        <li><Link to="/admin/withdrawals">💸 {isOpen && "Manage Withdrawals"}</Link></li>
        <li><Link to="/admin/settings">⚙️ {isOpen && "Settings"}</Link></li>
        <li><Link to="/admin/logout">🚪 {isOpen && "Logout"}</Link></li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
