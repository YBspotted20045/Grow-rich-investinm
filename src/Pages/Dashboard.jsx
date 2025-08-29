// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import API from "../axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    invested: 0,
    earnings: 0,
    referrals: 0,
    balance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const COLORS = ["#FFD700", "#DAA520", "#B8860B", "#8B7500"];

  const chartData = [
    { name: "Invested", value: stats.invested },
    { name: "Earnings", value: stats.earnings },
    { name: "Referrals", value: stats.referrals },
    { name: "Balance", value: stats.balance },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white p-6 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-8">GrowRich</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/investments" className="hover:text-yellow-300">Investments</Link>
          <Link to="/referrals" className="hover:text-yellow-300">Referrals</Link>
          <Link to="/withdrawals" className="hover:text-yellow-300">Withdrawals</Link>
          <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, {user?.fullname || "User"}
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Logout
          </button>
        </header>

        {/* Stats cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Invested", value: stats.invested },
            { title: "Earnings", value: stats.earnings },
            { title: "Referrals", value: stats.referrals },
            { title: "Balance", value: stats.balance },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white shadow-md rounded-2xl p-6 text-center"
            >
              <h3 className="text-gray-500">{item.title}</h3>
              <p className="text-2xl font-bold text-yellow-700">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart section */}
        <div className="p-6">
          <div className="bg-white shadow-md rounded-2xl p-6 h-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Investment Overview</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
