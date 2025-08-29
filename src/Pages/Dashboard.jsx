// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Menu, X, Sun, Moon } from "lucide-react"; // icons
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
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
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

  const hasData = chartData.some((item) => item.value > 0);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.4 }}
        className={`fixed md:static top-0 left-0 h-full w-64 
          bg-gradient-to-b from-yellow-600 to-yellow-800 dark:from-gray-800 dark:to-gray-900 
          text-white p-6 flex flex-col z-40 ${sidebarOpen ? "shadow-2xl" : ""}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">GrowRich</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/investments", label: "Investments" },
            { path: "/referrals", label: "Referrals" },
            { path: "/withdrawals", label: "Withdrawals" },
            { path: "/profile", label: "Profile" },
          ].map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-yellow-300 ${
                  isActive ? "font-bold text-yellow-300" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-yellow-700 dark:text-yellow-300" />
            </button>
            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Welcome, {user?.fullname || "User"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              Logout
            </button>
          </div>
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
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 text-center"
            >
              <h3 className="text-gray-500 dark:text-gray-400">{item.title}</h3>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                {formatCurrency(item.value)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart section */}
        <div className="p-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 h-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Investment Overview
            </h2>
            {hasData ? (
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
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
                No data to display
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
        }
