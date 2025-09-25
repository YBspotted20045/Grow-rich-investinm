import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [earnings, setEarnings] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch user investment
  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const res = await API.get("/investments/me");
        if (res.data.success) {
          setInvestment(res.data.investment);
          setEarnings(res.data.earnings);
        }
      } catch (err) {
        console.error("Error fetching investment:", err);
      }
    };
    fetchInvestment();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="dashboard-content">
        <h1 className="dashboard-heading">
          Welcome back, <span>{user ? user.username : "Investor"}</span>
        </h1>

        <h2 className="overview-title">Your Investment Overview</h2>

        {!investment ? (
          <p className="no-investment">No active investment yet.</p>
        ) : (
          <div className="cards-grid">
            <div className="info-card">
              <h3>Investment Amount</h3>
              <p>₦{investment.amount.toLocaleString()}</p>
            </div>

            <div className="info-card">
              <h3>Expected Return</h3>
              <p>₦{earnings?.maxPayout.toLocaleString()}</p>
            </div>

            <div className="info-card">
              <h3>Accrued Earnings</h3>
              <p>₦{earnings?.accrued.toLocaleString()}</p>
            </div>

            <div className="info-card">
              <h3>Available to Withdraw</h3>
              <p>₦{earnings?.available.toLocaleString()}</p>
            </div>

            <div className="info-card">
              <h3>Maturity Date</h3>
              <p>{new Date(investment.maturityDate).toDateString()}</p>
            </div>

            <div className="info-card status-card">
              <h3>Status</h3>
              <p className={investment.status}>{investment.status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
