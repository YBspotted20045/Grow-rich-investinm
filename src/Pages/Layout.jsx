// src/Pages/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css"; // gold-themed styling

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="layout-root">
      {/* Topbar */}
      <header className="topbar">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <h2 className="brand">GrowRich</h2>
        <div style={{ marginLeft: "auto" }} />
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <nav>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/deposit" onClick={() => setOpen(false)}>Deposit</Link>
          <Link to="/withdrawal" onClick={() => setOpen(false)}>Withdrawal</Link>
          <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
          <Link to="/referrals" onClick={() => setOpen(false)}>Referrals</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="layout-content" onClick={() => open && setOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
}
