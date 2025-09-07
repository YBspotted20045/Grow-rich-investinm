// src/Pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/auth/me");
        const me = res.data;
        setUser(me);

        const inv = await API.get("/investments/my");
        setInvestments(inv.data || []);

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
        console.error("Dashboard fetch error:", err);
      }
    })();
  }, []);

  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="content">
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
            {daysLeft > 0 ? `${daysLeft} day(s) left` : "Ready for withdrawal"}
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

      {/* Investments */}
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
  );
}
