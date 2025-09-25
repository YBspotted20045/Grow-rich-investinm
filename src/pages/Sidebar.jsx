// src/pages/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Deposit", path: "/deposit" },
    { name: "Withdraw", path: "/withdraw" },
    { name: "Investment", path: "/investment" },
    { name: "Referrals", path: "/referrals" },
    { name: "Account", path: "/account" },
  ];

  const handleLogout = () => {
    // remove token or user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login & prevent back button from returning
    navigate("/login", { replace: true });
    window.location.reload(); // ensure fresh state
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close button only on mobile */}
        <button className="sidebar-close" onClick={toggleSidebar}>
          ✖
        </button>

        <h2 className="sidebar-title">GrowRich</h2>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path} onClick={toggleSidebar}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="sidebar-logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
