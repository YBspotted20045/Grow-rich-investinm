// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "../axios";
import Header from "../components/Header";
import AdminSidebar from "../components/AdminSidebar";
import Card from "../components/Card";
import Table from "../components/Table";

const Dashboard = () => {
  const [stats, setStats] = useState({ plans: [], statuses: [] });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/dashboard/stats");
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.plans.map((plan) => (
            <Card
              key={plan._id}
              title={`Plan: ${plan._id}`}
              value={`₦${plan.amount}`}
              subtitle={`Users: ${plan.count}`}
            />
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Investments by Status</h2>
          <Table
            columns={["Status", "Count"]}
            data={stats.statuses.map((s) => [s._id, s.count])}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
