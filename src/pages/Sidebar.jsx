// src/pages/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // CSS file for styling

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Deposit", path: "/deposit" },
    { name: "Withdraw", path: "/withdraw" },
    { name: "Investment", path: "/investment" },
    { name: "Referrals", path: "/referrals" },
    { name: "Account", path: "/account" },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">GrowRich</h2>
      <ul className="sidebar-menu">
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

export default Sidebar;
