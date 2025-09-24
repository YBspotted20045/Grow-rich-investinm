import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user || {});
        setDeposits(res.data.deposits || []);
        setInvestment(res.data.investment || null);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">GrowRich</h2>
          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Invest</li>
            <li>Deposits</li>
            <li>Referrals</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Navbar */}
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1>Welcome, {user.fullName || "Investor"}</h1>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <section className="dashboard-section">
            <h2>Investment</h2>
            {investment ? (
              <div className="card">
                <p>Amount: ₦{investment.amount}</p>
                <p>Status: {investment.status}</p>
                <p>Start: {new Date(investment.startDate).toLocaleDateString()}</p>
                <p>Maturity: {new Date(investment.maturityDate).toLocaleDateString()}</p>
              </div>
            ) : (
              <p>No active investment.</p>
            )}
          </section>

          <section className="dashboard-section">
            <h2>Deposits</h2>
            {deposits.length ? (
              <ul className="list">
                {deposits.map((d) => (
                  <li key={d._id}>
                    Amount: ₦{d.amount} | Status: {d.status} | Date:{" "}
                    {new Date(d.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deposits yet.</p>
            )}
          </section>

          <section className="dashboard-section">
            <h2>Referrals</h2>
            {user.referrals && user.referrals.length ? (
              <ul className="list">
                {user.referrals.map((r) => (
                  <li key={r._id}>
                    {r.fullName} - ₦{r.investmentAmount} invested
                  </li>
                ))}
              </ul>
            ) : (
              <p>No referrals yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
