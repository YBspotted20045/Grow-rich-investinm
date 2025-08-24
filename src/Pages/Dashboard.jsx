// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        // ✅ your backend route is /api/auth/me
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) return <p style={{ textAlign: "center" }}>Loading Dashboard...</p>;

  // --- Values from your User schema ---
  const investmentAmount = Number(user.investmentAmount || 0);
  const referralCount = Array.isArray(user.referrals) ? user.referrals.length : 0;
  const createdAt = user.createdAt ? new Date(user.createdAt) : null;

  // Earnings logic (example: doubles after 14 days)
  let earnings = 0;
  if (investmentAmount && createdAt) {
    const diffDays = Math.floor((Date.now() - createdAt.getTime()) / 86400000);
    if (diffDays >= 14) earnings = investmentAmount * 2;
  }

  // Pie — show which plan the user picked
  const investmentAllocation = [
    { name: "₦5,000", value: investmentAmount === 5000 ? 1 : 0 },
    { name: "₦10,000", value: investmentAmount === 10000 ? 1 : 0 },
    { name: "₦15,000", value: investmentAmount === 15000 ? 1 : 0 },
  ];

  // Line — simple growth demo (1 point if no history)
  const growthData = [
    { cycle: "Cycle 1", earnings: earnings || 0 },
  ];

  // Bar — referrals (your model only has `referrals`, no indirect)
  const referralData = [
    { type: "Direct Referrals", count: referralCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div style={{ padding: "20px", background: "#f0f4ff", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        GrowRich Dashboard
      </h2>

      {/* Top Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" }}>
        <StatCard title="Your Investment" value={`₦${investmentAmount}`} />
        <StatCard title="Earnings" value={`₦${earnings}`} />
        <StatCard title="Referrals" value={`${referralCount}`} />
        <StatCard title="Maturity Status" value={earnings > 0 ? "Matured" : "Pending"} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "20px" }}>
        <div style={chartBox}>
          <h4>Investment Breakdown</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={investmentAllocation} dataKey="value" outerRadius={80} label>
                {investmentAllocation.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={chartBox}>
          <h4>Earnings Growth</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cycle" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={chartBox}>
          <h4>Referral Performance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={referralData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
        <StatCard title="Referral Code" value={user.referralCode || "—"} />
        <StatCard title="State" value={user.state || "—"} />
        <StatCard title="Joined" value={createdAt ? createdAt.toLocaleDateString() : "—"} />
      </div>
    </div>
  );
}

const StatCard = ({ title, value }) => (
  <div style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  }}>
    <h4 style={{ fontSize: "14px", marginBottom: "10px", color: "#555" }}>{title}</h4>
    <p style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>{value}</p>
  </div>
);

const chartBox = {
  background: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
