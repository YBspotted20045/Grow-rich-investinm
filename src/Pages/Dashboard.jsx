// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet, FaUsers, FaMoneyCheck, FaHandHoldingUsd } from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    balance: 0,
    investments: 0,
    referrals: 0,
    withdrawals: 0,
    recent: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const me = await API.get("/auth/me");
        setUser(me.data.user);

        const res = await API.get("/dashboard"); // ✅ backend must provide stats
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard-shell">
      {/* Topbar */}
      <div className="topbar">
        <h2>Welcome back, {user?.fullname || "Investor"}</h2>
        <p className="muted">Manage your investments and track your growth.</p>
      </div>

      {/* Summary cards */}
      <div className="cards-grid">
        <div className="card gold">
          <FaWallet className="icon" />
          <h3>₦{stats.balance.toLocaleString()}</h3>
          <p>Wallet Balance</p>
        </div>
        <div className="card dark">
          <FaHandHoldingUsd className="icon" />
          <h3>₦{stats.investments.toLocaleString()}</h3>
          <p>Active Investments</p>
        </div>
        <div className="card gold">
          <FaUsers className="icon" />
          <h3>{stats.referrals}</h3>
          <p>Total Referrals</p>
        </div>
        <div className="card dark">
          <FaMoneyCheck className="icon" />
          <h3>₦{stats.withdrawals.toLocaleString()}</h3>
          <p>Withdrawals</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="recent-section">
        <h3>Recent Transactions</h3>
        {stats.recent.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          <table className="recent-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((tx, i) => (
                <tr key={i}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.type}</td>
                  <td>₦{tx.amount.toLocaleString()}</td>
                  <td className={tx.status.toLowerCase()}>{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <Link to="/deposit" className="gold-btn">Make Deposit</Link>
        <Link to="/withdrawals" className="dark-btn">Withdraw</Link>
      </div>
    </div>
  );
}
