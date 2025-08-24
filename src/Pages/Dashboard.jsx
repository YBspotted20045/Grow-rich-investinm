import React, { useEffect, useState } from "react";
import API from "../axios"; // axios instance
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p className="loading">Loading Dashboard...</p>;
  }

  const { username, email, investmentAmount, createdAt, referralCode, referredBy, referrals } = userData;

  // Earnings after 14 days
  let earnings = 0;
  if (investmentAmount && createdAt) {
    const investDate = new Date(createdAt);
    const today = new Date();
    const diffDays = Math.floor((today - investDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 14) {
      earnings = investmentAmount * 2;
    }
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome, {username} 🎉</h2>

      <div className="dashboard-grid">
        {/* Profile */}
        <div className="card">
          <h3>👤 Profile</h3>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Referral Code:</strong> {referralCode}</p>
          <p><strong>Referred By:</strong> {referredBy || "None"}</p>
        </div>

        {/* Investment */}
        <div className="card">
          <h3>💰 Investment</h3>
          <p><strong>Amount:</strong> ₦{investmentAmount || 0}</p>
          <p><strong>Investment Date:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}</p>
          <p><strong>Expected Earnings:</strong> ₦{earnings}</p>
          <p>
            <strong>Status:</strong>{" "}
            {investmentAmount ? (
              <span className="status success">Active</span>
            ) : (
              <span className="status pending">No Investment</span>
            )}
          </p>
        </div>

        {/* Referrals */}
        <div className="card">
          <h3>🤝 Referrals</h3>
          {referrals && referrals.length > 0 ? (
            <ul>
              {referrals.map((r, index) => (
                <li key={index}>{r.email} - <span className="status success">Joined</span></li>
              ))}
            </ul>
          ) : (
            <p>No referrals yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
