import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [deposit, setDeposit] = useState(null);
  const [approvedReferrals, setApprovedReferrals] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
        setMessage(
          latestApproved
            ? "✅ Deposit approved successfully!"
            : "⚠️ No approved deposit yet."
        );
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

    // Refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="dashboard-container">
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  const amount = deposit?.amount || 0;
  const approvedAt = deposit?.approvedAt || null;
  const maturityDate = approvedAt
    ? new Date(new Date(approvedAt).getTime() + 14 * 24 * 60 * 60 * 1000)
    : null;
  const expectedReturn = amount * 2;
  const matured = maturityDate ? new Date() >= maturityDate : false;
  const withdrawalEligible = matured && approvedReferrals >= 2;

  return (
    <Layout>
      <div className="dashboard-container vertical">
        <h2 className="dashboard-title">Your Investment Overview</h2>
        <p className="status-message">{message}</p>

        <div className="vertical-cards">
          <div className="info-card">
            <h3>Amount Deposited</h3>
            <p>₦{amount.toLocaleString()}</p>
          </div>

          <div className="info-card">
            <h3>Expected Return</h3>
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
      </div>
    </Layout>
  );
};

export default Dashboard;
