// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "../pages/Sidebar.jsx"; 
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* Sidebar + Hamburger */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Page content */}
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
