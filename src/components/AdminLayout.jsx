// src/components/AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "../pages/AdminSidebar.jsx";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main className="admin-content">
        <header className="admin-header">
          <button className="admin-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h2>Admin Panel</h2>
        </header>
        <div className="admin-main">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
