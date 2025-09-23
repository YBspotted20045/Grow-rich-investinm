import React, { useEffect, useState } from "react";
import axios from "../axios";
import Header from "../components/Header";
import AdminSidebar from "../components/AdminSidebar";
import Card from "../components/Card";
import Table from "../components/Table";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ plans: [], statuses: [] });
  const [deposits, setDeposits] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const statsRes = await axios.get("/dashboard/stats");
        setStats(statsRes.data);

        const depositsRes = await axios.get("/deposits/all");
        setDeposits(depositsRes.data);

        const usersRes = await axios.get("/admin/users");
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Admin dashboard fetch error:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="admin-dashboard">
      <Header />
      <div className="main-layout">
        <AdminSidebar />
        <div className="dashboard-content">
          <h1>Admin Dashboard</h1>

          <div className="stats-cards">
            {stats.plans.map((plan) => (
              <Card key={plan._id} title={`Plan ${plan._id}`} value={`₦${plan.amount} (${plan.count})`} />
            ))}
            {stats.statuses.map((status) => (
              <Card key={status._id} title={`Status: ${status._id}`} value={status.count} />
            ))}
          </div>

          <div className="table-section">
            <h2>All Deposits</h2>
            <Table data={deposits} columns={["userId.email", "amount", "status", "createdAt"]} />

            <h2>All Users</h2>
            <Table data={users} columns={["username", "email", "investmentAmount", "referrals.length"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
