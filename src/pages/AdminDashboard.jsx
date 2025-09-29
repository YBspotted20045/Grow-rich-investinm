// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import AdminLayout from "../components/AdminLayout.jsx";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    pendingDeposits: 0,
    totalInvestments: 0,
    withdrawals: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token"); // ✅ keep consistent with login
      const res = await axios.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Use res.data.stats, not res.data
      setStats(res.data.stats);
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      setError(err.response?.data?.message || "Failed to fetch dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
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
              <p>₦{stats.totalDeposits}</p>
            </div>

            <div className="card">
              <h2>Pending Deposits</h2>
              <p>{stats.pendingDeposits}</p>
            </div>

            <div className="card">
              <h2>Total Investments</h2>
              <p>{stats.totalInvestments}</p>
            </div>

            <div className="card">
              <h2>Total Withdrawals</h2>
              <p>₦{stats.withdrawals}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
