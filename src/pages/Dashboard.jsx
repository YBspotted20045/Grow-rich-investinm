import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios.js";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const res = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setDeposits(res.data.deposits);
        setInvestment(res.data.investment);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login", { replace: true }); // redirect & disable back
  };

  if (loading) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">GrowRich</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Deposits</li>
            <li>Withdrawals</li>
            <li>Referrals</li>
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Dashboard</h1>
          <p>
            Welcome, <span className="username">{user.fullName}</span>
          </p>
        </header>

        {/* Sections remain the same */}
        {/* ... */}
      </main>
    </div>
  );
};

export default Dashboard;
