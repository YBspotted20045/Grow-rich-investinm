// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../pages/Sidebar.jsx";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    // Update when window is resized
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      {/* ✅ Show only one sidebar version depending on screen size */}
      {isDesktop ? (
        <Sidebar isOpen={true} /> // Always visible on desktop
      ) : (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Page content */}
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
