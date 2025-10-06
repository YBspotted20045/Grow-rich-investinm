// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../pages/Sidebar.jsx";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="layout">
      {/* ✅ Only one sidebar should ever exist */}
      <Sidebar
        isOpen={isDesktop ? true : isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* ✅ Main content area */}
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
