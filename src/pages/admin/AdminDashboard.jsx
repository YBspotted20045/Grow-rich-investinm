// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "30px", textAlign: "center" }}>
          Admin Panel
        </h2>
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={btnStyle}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          style={btnStyle}
        >
          Users
        </button>
        <button
          onClick={() => navigate("/admin/deposits")}
          style={btnStyle}
        >
          Deposits
        </button>
        <button
          onClick={() => navigate("/admin/withdrawals")}
          style={btnStyle}
        >
          Withdrawals
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: "#f8fafc" }}>
        {/* Topbar */}
        <div
          style={{
            background: "#fff",
            padding: "15px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "18px", margin: 0 }}>Welcome, Admin</h1>
          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Dashboard</h2>
          <p style={{ color: "#475569" }}>
            Select an option from the sidebar to manage users, deposits, or withdrawals.
          </p>
        </div>
      </main>
    </div>
  );
}

// Reusable sidebar button style
const btnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  textAlign: "left",
  padding: "12px 10px",
  marginBottom: "10px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "15px",
};
