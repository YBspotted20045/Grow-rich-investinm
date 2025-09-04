import React, { useEffect, useState } from "react";
import API from "../axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);

        if (res.data.maturityDate && res.data.investmentDate) {
          const start = new Date(res.data.investmentDate);
          const end = new Date(res.data.maturityDate);
          const now = new Date();

          const total = (end - start) / (1000 * 60 * 60 * 24); // total days
          if (total > 0) {
            const remaining = Math.max(0, (end - now) / (1000 * 60 * 60 * 24));
            const percent = Math.min(
              100,
              ((total - remaining) / total) * 100
            );

            setDaysLeft(Math.ceil(remaining));
            setProgress(percent);
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="loader">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      {/* Welcome banner */}
      <div className="welcome-banner">
        Welcome, <span className="highlight">{user.name || "Investor"}</span>
      </div>

      <div className="dashboard-grid">
        {/* Investment summary cards */}
        <div className="dashboard-card">
          <h2 className="dashboard-title">Your Investment</h2>
          <p className="dashboard-value">
            ₦{user.investmentAmount || 0}
          </p>
          <p className="dashboard-label">Active Investment</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-title">Expected Return</h2>
          <p className="dashboard-value">
            ₦{user.expectedReturn || 0}
          </p>
          <p className="dashboard-label">After maturity period</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-title">Maturity Date</h2>
          <p className="dashboard-value">
            {user.maturityDate || "N/A"}
          </p>
          <p className="dashboard-label">
            {daysLeft > 0
              ? `${daysLeft} day(s) remaining`
              : "Ready for withdrawal"}
          </p>

          {/* Progress bar */}
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-title">Referral Code</h2>
          <p className="dashboard-value">
            {user.referralCode || "N/A"}
          </p>
          <p className="dashboard-label">Share with friends to earn</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
