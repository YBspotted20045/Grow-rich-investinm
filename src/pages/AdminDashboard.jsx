import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Header from "../components/Header.jsx";
import StatsCard from "../components/StatsCard.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ plans: [], statuses: [] });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await axios.get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch dashboard stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {message && <p className="mb-4 text-red-600">{message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.plans.map((plan) => (
            <StatsCard
              key={plan._id}
              title={`Plan: ₦${plan._id}`}
              value={`Total Amount: ₦${plan.amount}, Users: ${plan.count}`}
            />
          ))}
          {stats.statuses.map((status) => (
            <StatsCard
              key={status._id}
              title={`Status: ${status._id}`}
              value={`Count: ${status.count}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
