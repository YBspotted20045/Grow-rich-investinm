import React, { useEffect, useState } from "react";
import API from "../axios";
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
    return <p>Loading...</p>;
  }

  const {
    username,
    email,
    state,
    investmentAmount,
    referralCode,
    referredBy,
    paymentConfirmed,
    createdAt,
    referrals = [],
  } = userData;

  // Calculate expected earnings after 14 days
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
    <div className="dashboard-container">
      <h2>Welcome, {username}</h2>
      <div className="dashboard-info">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>State:</strong> {state || "Not provided"}</p>
        <p><strong>Investment:</strong> ₦{investmentAmount || 0}</p>
        <p><strong>Investment Date:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}</p>
        <p><strong>Expected Earnings (after 14 days):</strong> ₦{earnings}</p>
        <p><strong>Referral Code:</strong> {referralCode}</p>
        <p><strong>Referred By:</strong> {referredBy || "None"}</p>
        <p>
          <strong>Payment Status:</strong>{" "}
          {paymentConfirmed ? "✅ Confirmed" : "⏳ Pending"}
        </p>
      </div>

      {/* Referrals Section */}
      <div className="referrals-section">
        <h3>Your Referrals</h3>
        {referrals.length === 0 ? (
          <p>No referrals yet.</p>
        ) : (
          <ul>
            {referrals.map((ref) => (
              <li key={ref._id}>
                {ref.username} – {ref.email} (Joined:{" "}
                {new Date(ref.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
