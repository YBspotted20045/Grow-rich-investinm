// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import API from "./axios"; // corrected path
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [earnings, setEarnings] = useState(null);

  // fetch logged-in user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, invRes] = await Promise.all([
          API.get("/users/me"),
          API.get("/investments/me"),
        ]);

        if (userRes.data.success) {
          setUser(userRes.data.user);
        }

        if (invRes.data.success) {
          setInvestment(invRes.data.investment);
          setEarnings(invRes.data.earnings);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchData();
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
          <h2>Your Investment Overview</h2>
          {investment ? (
            <div className="investment-card">
              <p>
                <strong>Amount Invested:</strong> ₦{investment.amount}
              </p>
              <p>
                <strong>Expected Return:</strong> ₦{earnings?.maxPayout}
              </p>
              <p>
                <strong>Accrued Earnings:</strong> ₦{earnings?.accrued}
              </p>
              <p>
                <strong>Available Balance:</strong> ₦{earnings?.available}
              </p>
              <p>
                <strong>Status:</strong> {investment.status}
              </p>
              <p>
                <strong>Maturity Date:</strong>{" "}
                {new Date(investment.maturityDate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>No active investment yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
