// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import API from "../axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Top navbar with hamburger */}
      <div className="dashboard-navbar">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 className="dashboard-title">
          Welcome, <span>{user ? user.username : "Investor"}</span>
        </h1>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Your Overview</h2>
          <p>Investments, deposits, and referrals will show here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
