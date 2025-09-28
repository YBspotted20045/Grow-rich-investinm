// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import AdminLayout from "../components/AdminLayout.jsx"; // ✅ Layout wrapper
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });

  // ✅ Fetch stats from backend
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token"); // fallback
      const res = await axios.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Fetch admin stats error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout> {/* ✅ Sidebar + header wrapper */}
      <div className="admin-dashboard-container">
        <h1 className="admin-title">Admin Dashboard</h1>

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
            <h2>Total Withdrawals</h2>
            <p>₦{stats.totalWithdrawals}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
