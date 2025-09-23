// src/pages/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

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
        <button onClick={() => navigate("/admin/dashboard")} style={btnStyle}>
          Dashboard
        </button>
        <button onClick={() => navigate("/admin/users")} style={btnActive}>
          Users
        </button>
        <button onClick={() => navigate("/admin/deposits")} style={btnStyle}>
          Deposits
        </button>
        <button onClick={() => navigate("/admin/withdrawals")} style={btnStyle}>
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
          <h1 style={{ fontSize: "18px", margin: 0 }}>Manage Users</h1>
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
          <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>Registered Users</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
              <thead>
                <tr style={{ background: "#e2e8f0" }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Referral Code</th>
                  <th style={thStyle}>Investment</th>
                  <th style={thStyle}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={tdStyle}>{u.username}</td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}>{u.referralCode}</td>
                      <td style={tdStyle}>₦{u.investmentAmount || 0}</td>
                      <td style={tdStyle}>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar button styles
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

const btnActive = {
  ...btnStyle,
  background: "#334155",
};

// Table styles
const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontWeight: "bold",
  fontSize: "14px",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
};
