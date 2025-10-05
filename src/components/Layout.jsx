// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "../pages/Sidebar.jsx";
import "../pages/Sidebar.css"; // fixed path

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Hamburger button */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
