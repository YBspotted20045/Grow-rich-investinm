// src/Pages/admin/SidebarAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar-admin">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li><Link to="/admin/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/admin/users">👥 Manage Users</Link></li>
        <li><Link to="/admin/deposits">💰 Manage Deposits</Link></li>
        <li><Link to="/admin/withdrawals">💸 Manage Withdrawals</Link></li>
        <li><Link to="/admin/settings">⚙️ Settings</Link></li>
        <li><Link to="/admin/logout">🚪 Logout</Link></li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
