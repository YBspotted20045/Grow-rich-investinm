import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
      <nav>
        <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
        <Link to="/deposit" onClick={() => setOpen(false)}>Deposit</Link>
        <Link to="/withdrawal" onClick={() => setOpen(false)}>Withdrawal</Link>
        <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
        <Link to="/vendors" onClick={() => setOpen(false)}>Vendors</Link>
        <Link to="/referrals" onClick={() => setOpen(false)}>Referrals</Link>
      </nav>
    </aside>
  );
}
