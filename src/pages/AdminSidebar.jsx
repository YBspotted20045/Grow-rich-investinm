// src/pages/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css"; // CSS file for styling

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Deposits", path: "/admin/deposits" },
    { name: "Withdrawals", path: "/admin/withdrawals" },
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="admin-sidebar-title">Admin Panel</h2>
      <ul className="admin-sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
