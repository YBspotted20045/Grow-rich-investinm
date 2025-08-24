// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../axios"; // ✅ your centralized axios instance
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInvestments: 0,
    activeInvestments: [],
    withdrawals: [],
    referrals: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Assuming you store logged in user in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          navigate("/login");
          return;
        }

        const res = await API.get(`/dashboard/${user._id}`);
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching dashboard:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Investments */}
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Total Investments</h2>
          <p className="text-xl">₦{stats.totalInvestments}</p>
        </div>

        {/* Active Investments */}
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Active Investments</h2>
          <p className="text-xl">{stats.activeInvestments.length}</p>
        </div>

        {/* Withdrawals */}
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Withdrawals</h2>
          <p className="text-xl">{stats.withdrawals.length}</p>
        </div>

        {/* Referrals */}
        <div className="bg-purple-100 p-4 rounded-xl shadow">
          <h2 className="font-semibold">Referrals</h2>
          <p className="text-xl">{stats.referrals.length}</p>
        </div>
      </div>

      {/* Active Investments list */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Active Investments</h2>
        {stats.activeInvestments.length > 0 ? (
          <ul className="list-disc ml-6">
            {stats.activeInvestments.map((inv) => (
              <li key={inv._id}>
                ₦{inv.amount} - {inv.plan} ({inv.status})
              </li>
            ))}
          </ul>
        ) : (
          <p>No active investments</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
