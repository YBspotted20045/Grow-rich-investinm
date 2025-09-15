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

  // Auto logout after 10 minutes inactivity
  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("gr_token");
        navigate("/login", { replace: true });
      }, 10 * 60 * 1000);
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
        if (!me) throw new Error("No user returned from server");
        setUser(me);

        const inv = await API.get("/investments/my");
        setInvestments(inv.data || []);

        if (me.investmentDate && me.maturityDate) {
          const start = new Date(me.investmentDate);
          const end = new Date(me.maturityDate);
          const now = new Date();

          const total = (end - start) / (1000 * 60 * 60 * 24);
          const remaining = Math.max(0, (end - now) / (1000 * 60 * 60 * 24));
          const percent = total > 0 ? Math.min(100, ((total - remaining) / total) * 100) : 0;

          setDaysLeft(Math.ceil(remaining));
          setProgress(percent);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        const status = err?.response?.status;
        if (status === 401) {
          localStorage.removeItem("gr_token");
          navigate("/login", { replace: true });
        } else {
          setError(err.response?.data?.message || err.message || "Failed to load dashboard");
        }
      }
    })();
  }, [navigate]);

  if (error) {
    return <div style={{ padding: 20, color: "red" }}>⚠️ Dashboard Error: {error}</div>;
  }

  if (!user) return <div className="loader">Loading...</div>;

  const eligible = user.eligibleForWithdrawal ?? (user.referralDeposits >= 2);

  return (
    <div className="dashboard-content">
      <h3>Dashboard</h3>
      <div className="muted">Welcome, {user.username || user.fullName || user.fullname || "Investor"}</div>

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
          <p>{user.maturityDate ? new Date(user.maturityDate).toLocaleDateString() : "N/A"}</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <small>{daysLeft > 0 ? `${daysLeft} day(s) left` : "Ready for withdrawal"}</small>
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
          <p className={eligible ? "status-ok" : "status-bad"}>
            {eligible ? "Eligible" : "Not Eligible"}
          </p>
        </div>
      </div>

      <div className="investments">
        <h4>Your Investments</h4>
        {investments.length === 0 ? (
          <p className="muted">No active investments yet.</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr><th>Amount</th><th>Date</th><th>Maturity</th><th>Status</th></tr>
            </thead>
            <tbody>
              {investments.map((inv, idx) => (
                <tr key={idx}>
                  <td>₦{inv.amount}</td>
                  <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td>{inv.maturityDate ? new Date(inv.maturityDate).toLocaleDateString() : "N/A"}</td>
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
