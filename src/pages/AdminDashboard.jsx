// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "./axios.js";
import AdminLayout from "../components/AdminLayout.jsx";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    pendingDeposits: 0,
    totalWithdrawals: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Function to fetch admin stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No admin token found. Please log in again.");

      const res = await API.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Backend sends stats as object — directly set
      if (res.data) setStats(res.data);
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // ✅ Auto-refresh dashboard every 20 seconds for real-time update
    const interval = setInterval(fetchStats, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        {loading ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="stats-cards">
            <div className="card">
              <h2>Total Users</h2>
              <p>{stats.totalUsers ?? 0}</p>
            </div>

            <div className="card">
              <h2>Total Deposits</h2>
              <p>{stats.totalDeposits ?? 0}</p>
            </div>

            <div className="card">
              <h2>Pending Deposits</h2>
              <p style={{ color: stats.pendingDeposits > 0 ? "orange" : "green" }}>
                {stats.pendingDeposits ?? 0}
              </p>
            </div>

            <div className="card">
              <h2>Total Withdrawals</h2>
              <p>{stats.totalWithdrawals ?? 0}</p>
            </div>
          </div>
        )}

        <button
          onClick={fetchStats}
          className="refresh-btn"
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          🔄 Refresh Stats
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
