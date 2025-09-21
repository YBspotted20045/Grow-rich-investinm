// src/Pages/admin/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";
import "./DashboardHome.css";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    pendingDeposits: 0,
    withdrawals: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    })();
  }, []);

  return (
    <div className="dashboard-home">
      <h2 className="page-title">📊 Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Deposits</h3>
          <p>{stats.totalDeposits}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Deposits</h3>
          <p>{stats.pendingDeposits}</p>
        </div>
        <div className="stat-card">
          <h3>Withdrawals</h3>
          <p>{stats.withdrawals}</p>
        </div>
      </div>
    </div>
  );
}
