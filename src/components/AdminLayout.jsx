// src/components/AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "../AdminSidebar.jsx";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* ✅ Mobile hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar (collapsible) */}
      <AdminSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className={`admin-main ${sidebarOpen ? "sidebar-open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
