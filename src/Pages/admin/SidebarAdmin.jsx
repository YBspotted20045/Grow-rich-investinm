// src/Pages/admin/SidebarAdmin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // hamburger icon
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Hamburger Icon (always visible at top-left) */}
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* 🔹 Sidebar */}
      <div className={`sidebar-admin ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li><Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>📊 Dashboard</Link></li>
          <li><Link to="/admin/users" onClick={() => setIsOpen(false)}>👥 Manage Users</Link></li>
          <li><Link to="/admin/deposits" onClick={() => setIsOpen(false)}>💰 Manage Deposits</Link></li>
          <li><Link to="/admin/withdrawals" onClick={() => setIsOpen(false)}>💸 Manage Withdrawals</Link></li>
          <li><Link to="/admin/settings" onClick={() => setIsOpen(false)}>⚙️ Settings</Link></li>
          <li><Link to="/admin/logout" onClick={() => setIsOpen(false)}>🚪 Logout</Link></li>
        </ul>
      </div>
    </>
  );
};

export default SidebarAdmin;
