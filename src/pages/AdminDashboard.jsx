import React, { useEffect, useState } from "react";
import API from "../axios.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, deposits: 0, withdrawals: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-semibold">Total Deposits</h2>
          <p className="text-2xl font-bold">{stats.deposits}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-semibold">Total Withdrawals</h2>
          <p className="text-2xl font-bold">{stats.withdrawals}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
