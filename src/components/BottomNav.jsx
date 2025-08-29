// src/components/BottomNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Item = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "bottom-item " + (isActive ? "active" : "")
    }
  >
    <span aria-hidden>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Item to="/dashboard" label="Dashboard" icon="📊" />
      <Item to="/invest" label="Invest" icon="💹" />
      <Item to="/deposit" label="Deposit" icon="💳" />
      <Item to="/withdraw" label="Withdraw" icon="🏧" />
      <Item to="/referrals" label="Referrals" icon="👥" />
    </nav>
  );
}
