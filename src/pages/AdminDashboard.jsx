import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
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
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
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
  );
};

export default AdminDashboard;
