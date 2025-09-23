import React, { useEffect, useState } from "react";
import API from "../axios.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch admin stats.");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {message && <p className="text-red-500">{message}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Total Users</h2>
          <p>{stats.totalUsers || 0}</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Total Deposits</h2>
          <p>₦{stats.totalDeposits || 0}</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Total Withdrawals</h2>
          <p>₦{stats.totalWithdrawals || 0}</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Pending Deposits</h2>
          <p>{stats.pendingDeposits || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
