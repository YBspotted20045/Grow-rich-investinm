// src/components/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={closeSidebar}>
        ✖
      </button>
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard" onClick={closeSidebar}>Dashboard</Link></li>
          <li><Link to="/admin/users" onClick={closeSidebar}>Manage Users</Link></li>
          <li><Link to="/admin/deposits" onClick={closeSidebar}>Deposits</Link></li>
          <li><Link to="/admin/withdrawals" onClick={closeSidebar}>Withdrawals</Link></li>
          <li><Link to="/admin/referrals" onClick={closeSidebar}>Referrals</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
