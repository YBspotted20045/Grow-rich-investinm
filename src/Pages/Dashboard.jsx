// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("gr_token");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const res = await API.get("/auth/me");
        const me = res.data?.user || res.data;
        setUser(me);

        const inv = await API.get("/investments/my");
        setInvestments(inv.data || []);

        if (me?.investmentDate && me?.maturityDate) {
          const start = new Date(me.investmentDate);
          const end = new Date(me.maturityDate);
          const now = new Date();

          const total = (end - start) / (1000 * 60 * 60 * 24);
          const remaining = Math.max(0, (end - now) / (1000 * 60 * 60 * 24));
          const percent = total > 0 ? ((total - remaining) / total) * 100 : 0;

          setDaysLeft(Math.ceil(remaining));
          setProgress(Math.min(100, percent));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      }
    })();
  }, [navigate]);

  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="loader">Loading...</div>;

  const eligible = user.eligibleForWithdrawal ?? (user.referralDeposits >= 2);

  return (
    <div className="page-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">GrowRich</h2>
        <ul>
          <li><a href="/dashboard">📊 Dashboard</a></li>
          <li><a href="/deposit">💰 Deposit</a></li>
          <li><a href="/withdrawal">🏦 Withdrawals</a></li>
          <li><a href="/account">👤 Account</a></li>
          <li><a href="/referrals">👥 Referrals</a></li>
        </ul>
        <button
          className="gold-btn mt-4"
          onClick={() => {
            localStorage.removeItem("gr_token");
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main className="main">
        <div className="topbar">
          <h3>Dashboard</h3>
          <div className="muted">
            Welcome, {user.username || user.fullName || "Investor"}
          </div>
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
                />
              </div>
              <small>
                {daysLeft > 0
                  ? `${daysLeft} day(s) left`
                  : "Ready for withdrawal"}
              </small>
            </div>

            <div className="stat-card">
              <h4>Status</h4>
              <p className={eligible ? "status-ok" : "status-bad"}>
                {eligible ? "Eligible" : "Not Eligible"}
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
                      <td>
                        {inv.maturityDate
                          ? new Date(inv.maturityDate).toLocaleDateString()
                          : "N/A"}
                      </td>
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
