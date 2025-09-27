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
    // 🚫 Removed Investment
    { name: "Referrals", path: "/referrals" },
    { name: "Account", path: "/account" },
  ];

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login and block back navigation
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close button (only mobile) */}
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
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
