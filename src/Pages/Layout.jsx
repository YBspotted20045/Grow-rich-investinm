// src/Pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css"; // gold-themed styling

export default function Layout() {
  return (
    <div className="layout-root">
      {/* Topbar */}
      <header className="topbar">
        <h2 className="brand">GrowRich</h2>
      </header>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
