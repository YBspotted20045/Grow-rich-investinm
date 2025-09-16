// src/Pages/Sidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gr_token"); // clear token
    navigate("/login"); // redirect to login page
  };

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
      
      <nav>
        <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
        <Link to="/deposit" onClick={() => setOpen(false)}>Deposit</Link>
        <Link to="/withdrawal" onClick={() => setOpen(false)}>Withdrawal</Link>
        <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
        <Link to="/referrals" onClick={() => setOpen(false)}>Referrals</Link>
      </nav>

      {/* ✅ Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
