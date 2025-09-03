import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
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
      <main className="content">{children}</main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} GrowRich
      </footer>
    </div>
  );
};

export default Layout;
