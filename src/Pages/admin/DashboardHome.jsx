import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    users: 0,
    deposits: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all users
        const usersRes = await API.get("/users");
        // fetch all deposits (admin)
        const depositsRes = await API.get("/admin/deposits", {
          headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
        });

        setStats({
          users: usersRes.data.length,
          deposits: depositsRes.data.length,
          pending: depositsRes.data.filter((d) => d.status === "pending").length,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-gray-600">Total Deposits</h2>
          <p className="text-3xl font-bold">{stats.deposits}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-gray-600">Pending Deposits</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
