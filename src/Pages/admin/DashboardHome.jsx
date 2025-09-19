// src/Pages/admin/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    users: 0,
    deposits: 0,
    pendingDeposits: 0,
    withdrawals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("gr_token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch users
        const usersRes = await API.get("/users", { headers });
        // Fetch deposits
        const depositsRes = await API.get("/deposits", { headers });
        // Fetch withdrawals
        const withdrawalsRes = await API.get("/withdrawals", { headers });

        const deposits = depositsRes.data || [];
        const pendingDeposits = deposits.filter(
          (d) => d.status === "pending"
        ).length;

        setStats({
          users: usersRes.data?.length || 0,
          deposits: deposits.length,
          pendingDeposits,
          withdrawals: withdrawalsRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Total Users</h3>
        <p className="text-2xl font-bold text-green-600">{stats.users}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Total Deposits</h3>
        <p className="text-2xl font-bold text-green-600">{stats.deposits}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Pending Deposits</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pendingDeposits}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-gray-600">Withdrawals</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.withdrawals}</p>
      </div>
    </div>
  );
}
