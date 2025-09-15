import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
        setError("⚠️ Failed to load dashboard");
      }
    })();
  }, [navigate]);

  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard-page">
      <h2 className="dash-title">📊 Dashboard</h2>
      <p className="welcome">Welcome, {user.username || "Investor"}!</p>

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
            {daysLeft > 0 ? `${daysLeft} day(s) left` : "✅ Ready for withdrawal"}
          </small>
        </div>
      </div>
    </div>
  );
}
