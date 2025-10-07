import React, { useState, useEffect } from "react";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [deposit, setDeposit] = useState(null);
  const [approvedReferrals, setApprovedReferrals] = useState(0);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bonus] = useState(1000); // ✅ Always include ₦1000 sign-up bonus

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/deposits/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const deposits = res.data.deposits || [];
        const latestApproved = deposits
          .filter((d) => d.status === "approved")
          .sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt))[0];

        setDeposit(latestApproved || null);

        if (latestApproved) {
          setMessage("✅ Deposit approved successfully!");
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3 * 60 * 1000);
        } else {
          setMessage("");
          setShowMessage(false);
        }
      } else {
        setMessage("❌ Failed to load deposits.");
      }
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setMessage("⚠️ Error loading your dashboard.");
    }
  };

  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovedReferrals(res.data.approvedReferralCount || 0);
    } catch (err) {
      console.error("Error fetching referrals:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDeposits();
      await fetchReferrals();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <p className="loading-text">Loading your dashboard...</p>
      </div>
    );
  }

  const amount = deposit?.amount || 0;
  const approvedAt = deposit?.approvedAt || null;
  const maturityDate = approvedAt
    ? new Date(new Date(approvedAt).getTime() + 14 * 24 * 60 * 60 * 1000)
    : null;

  const expectedReturn = amount > 0 ? amount * 2 : 0;
  const matured = maturityDate ? new Date() >= maturityDate : false;
  const withdrawalEligible = matured && approvedReferrals >= 2;

  const totalIncome = expectedReturn + bonus; // ✅ Always includes ₦1000 bonus

  return (
    <div className="dashboard-container">
      {showMessage && (
        <p className="floating-message fade-in-out">{message}</p>
      )}

      <div className="top-card">
        <h2>Total Income Returned</h2>
        <p>₦{totalIncome.toLocaleString()}</p>
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <h3>Amount Deposited</h3>
          <p>₦{amount.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Expected Return (x2)</h3>
          <p>₦{expectedReturn.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Approval Date</h3>
          <p>{approvedAt ? new Date(approvedAt).toDateString() : "—"}</p>
        </div>

        <div className="info-card">
          <h3>Maturity Date</h3>
          <p>{maturityDate ? maturityDate.toDateString() : "—"}</p>
        </div>

        <div className="info-card">
          <h3>Referral Requirement</h3>
          <p>{approvedReferrals}/2 referrals have deposited</p>
        </div>

        <div className="info-card">
          <h3>Withdrawal Eligibility</h3>
          <p>{withdrawalEligible ? "✅ Eligible" : "❌ Not Yet"}</p>
        </div>
      </div>

      {/* 🎁 Sign-Up Bonus Always Visible */}
      <div className="bonus-card gold-gradient">
        <h3>🎉 Sign-Up Bonus</h3>
        <p>₦{bonus.toLocaleString()} has been added to your dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
