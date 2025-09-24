// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios"; // centralized axios instance

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    totalDeposits: 0,
  });

  // Fetch general stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/dashboard/stats");
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Header section */}
      <header className="w-full bg-black text-white py-6">
        <h1 className="text-4xl font-bold text-center text-yellow-500">GrowRich Investments</h1>
        <p className="text-center mt-2 text-white">Invest, Refer & Grow Your Wealth</p>
      </header>

      {/* Stats preview */}
      <section className="flex flex-wrap justify-center gap-6 my-12">
        <div className="bg-yellow-500 text-black p-6 rounded-lg shadow-md min-w-[200px] text-center">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-yellow-500 text-black p-6 rounded-lg shadow-md min-w-[200px] text-center">
          <h3 className="text-xl font-semibold">Total Investments</h3>
          <p className="text-3xl font-bold">{stats.totalInvestments}</p>
        </div>
        <div className="bg-yellow-500 text-black p-6 rounded-lg shadow-md min-w-[200px] text-center">
          <h3 className="text-xl font-semibold">Total Deposits</h3>
          <p className="text-3xl font-bold">{stats.totalDeposits}</p>
        </div>
      </section>

      {/* Action buttons */}
      <section className="flex gap-6">
        <Link
          to="/login"
          className="px-8 py-3 bg-black text-yellow-500 font-bold rounded hover:bg-gray-800"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-8 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
        >
          Sign Up
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-4 mt-20">
        <p>&copy; {new Date().getFullYear()} GrowRich Investments. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
