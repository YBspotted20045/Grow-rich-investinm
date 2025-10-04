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
    totalInvestments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch admin stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No admin token found. Please log in again.");

      const res = await API.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Handle both possible formats (flat or nested)
      const data = res.data.stats
        ? res.data.stats
        : {
            totalUsers: res.data.totalUsers,
            totalDeposits: res.data.totalDeposits,
            pendingDeposits: res.data.pendingDeposits,
            totalWithdrawals: res.data.totalWithdrawals,
            totalInvestments: res.data.totalInvestments,
          };

      setStats({
        totalUsers: data.totalUsers || 0,
        totalDeposits: data.totalDeposits || 0,
        pendingDeposits: data.pendingDeposits || 0,
        totalWithdrawals: data.totalWithdrawals || 0,
        totalInvestments: data.totalInvestments || 0,
      });
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch dashboard stats."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 20000); // auto-refresh
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
              <p>{stats.totalUsers}</p>
            </div>

            <div className="card">
              <h2>Total Deposits</h2>
              <p>{stats.totalDeposits}</p>
            </div>

            <div className="card">
              <h2>Pending Deposits</h2>
              <p
                style={{
                  color: stats.pendingDeposits > 0 ? "orange" : "green",
                }}
              >
                {stats.pendingDeposits}
              </p>
            </div>

            <div className="card">
              <h2>Total Withdrawals</h2>
              <p>{stats.totalWithdrawals}</p>
            </div>

            <div className="card">
              <h2>Total Investments</h2>
              <p>{stats.totalInvestments}</p>
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
