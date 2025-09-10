// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaUsers,
  FaMoneyCheck,
  FaUniversity,
  FaPlusCircle,
} from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(""); // 👈 new state

  // Auto logout after 10 minutes inactivity
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("gr_token");
        navigate("/login");
      }, 10 * 60 * 1000); // 10 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [navigate]);

  // Fetch user + investments
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("gr_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/auth/me");
        console.log("User response:", res.data);
        if (!res.data.user) throw new Error("No user found in response");
        setUser(res.data.user);

        const inv = await API.get("/investments/my");
        console.log("Investments response:", inv.data);
        setInvestments(inv.data || []);

        if (res.data.user.investmentDate && res.data.user.maturityDate) {
          const start = new Date(res.data.user.investmentDate);
          const end = new Date(res.data.user.maturityDate);
          const now = new Date();

          const total = (end - start) / (1000 * 60 * 60 * 24);
          const remaining = Math.max(0, (end - now) / (1000 * 60 * 60 * 24));
          const percent = Math.min(100, ((total - remaining) / total) * 100);

          setDaysLeft(Math.ceil(remaining));
          setProgress(percent);
        }
      } catch (err) {
        console.error("Dashboard error:", err.response || err.message);
        setError(err.response?.data?.message || err.message || "Failed to load dashboard"); // 👈 show error
      }
    })();
  }, [navigate]);

  // If error
  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        ⚠️ Dashboard Error: {error}
      </div>
    );
  }

  // If loading
  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="page-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li>
            <Link to="/dashboard" className="active">
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/deposit">
              <FaPlusCircle /> Deposit
            </Link>
          </li>
          <li>
            <Link to="/withdrawals">
              <FaMoneyCheck /> Withdrawals
            </Link>
          </li>
          <li>
            <Link to="/account">
              <FaUniversity /> Bank Account
            </Link>
          </li>
          <li>
            <Link to="/vendors">
              <FaWallet /> Vendors
            </Link>
          </li>
          <li>
            <Link to="/referrals">
              <FaUsers /> Referrals
            </Link>
          </li>
        </ul>
        <button
          className="gold-btn mt-4"
          onClick={() => {
            localStorage.removeItem("gr_token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="topbar">
          <h3>Dashboard</h3>
          <div className="muted">Welcome, {user.fullname}</div>
        </div>

        <div className="content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Active Investment</h4>
              <p>₦{user.investmentAmount || 0}</p>
            </div>

            <div className="stat-card">
              <h4>Expected Return</h4>
              <p>₦{user.expectedReturn || 0}</p>
            </div>

            <div className="stat-card">
              <h4>Maturity</h4>
              <p>
                {user.maturityDate
                  ? new Date(user.maturityDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <small>
                {daysLeft > 0
                  ? `${daysLeft} day(s) left`
                  : "Ready for withdrawal"}
              </small>
            </div>

            <div className="stat-card">
              <h4>Referral Code</h4>
              <p>{user.referralCode || "N/A"}</p>
            </div>

            <div className="stat-card">
              <h4>Referred By</h4>
              <p>{user.referredBy || "None"}</p>
            </div>

            <div className="stat-card">
              <h4>Status</h4>
              <p
                className={
                  user.eligibleForWithdrawal ? "status-ok" : "status-bad"
                }
              >
                {user.eligibleForWithdrawal ? "Eligible" : "Not Eligible"}
              </p>
            </div>
          </div>

          {/* Investments Table */}
          <div className="investments">
            <h4>Your Investments</h4>
            {investments.length === 0 ? (
              <p className="muted">No active investments yet.</p>
            ) : (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Maturity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv, idx) => (
                    <tr key={idx}>
                      <td>₦{inv.amount}</td>
                      <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(inv.maturityDate).toLocaleDateString()}</td>
                      <td>{inv.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
      }
