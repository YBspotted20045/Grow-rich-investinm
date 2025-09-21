import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaMoneyCheckAlt, FaHome, FaSignOutAlt } from "react-icons/fa";
import "../../styles/admin.css"; // Import styles

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <FaHome /> },
    { path: "/admin/users", label: "Manage Users", icon: <FaUsers /> },
    { path: "/admin/deposits", label: "Manage Deposits", icon: <FaMoneyCheckAlt /> },
    { path: "/logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">GrowRich Admin</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
      }
