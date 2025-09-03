import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="brand">GrowRich</h1>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="content">
        <Outlet /> {/* 🚀 This is where Dashboard, Invest, etc. will appear */}
      </main>

      {/* Footer */}
      <footer className="footer">© {new Date().getFullYear()} GrowRich</footer>
    </div>
  );
};

export default Layout;
