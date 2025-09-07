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

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("gr_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // ✅ Backend returns the user directly
        const res = await API.get("/auth/me");
        const me = res.data;
        setUser(me);

        // Fetch investments
        const inv = await API.get("/investments/my");
        setInvestments(inv.data || []);

        // Maturity countdown
        if (me.investmentDate && me.maturityDate) {
          const start = new Date(me.investmentDate);
          const end = new Date(me.maturityDate);
          const now = new Date();

          const total = (end - start) / (1000 * 60 * 60 * 24);
          const remaining = Math.max(0, (end - now) / (1000 * 60 * 60 * 24));
          const percent = Math.min(100, ((total - remaining) / total) * 100);

          setDaysLeft(Math.ceil(remaining));
          setProgress(percent);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
        // ❌ Don’t auto logout immediately
      }
    })();
  }, [navigate]);

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
          <div className="muted">Welcome, {user.username}</div>
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
