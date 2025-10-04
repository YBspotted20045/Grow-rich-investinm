import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [deposit, setDeposit] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await API.get("/deposits/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const deposits = res.data.deposits || [];
        const latestApproved = deposits
          .filter((d) => d.status === "approved")
          .sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt))[0];

        if (latestApproved) {
          setDeposit(latestApproved);
          setMessage("✅ Deposit approved successfully!");
        } else {
          setDeposit(null);
          setMessage("⚠️ No approved deposit yet.");
        }
      } else {
        setMessage("❌ Failed to load deposits.");
      }
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setMessage("⚠️ Error loading your dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
    const interval = setInterval(fetchDeposits, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Loading your dashboard...</p>
      </Layout>
    );
  }

  if (!deposit) {
    return (
      <Layout>
        <h2>Your Investment Overview</h2>
        <p>{message}</p>
      </Layout>
    );
  }

  // ✅ Calculate 14-day maturity date
  const approvalDate = deposit.approvedAt ? new Date(deposit.approvedAt) : null;
  const maturityDate = approvalDate
    ? new Date(approvalDate.getTime() + 14 * 24 * 60 * 60 * 1000)
    : null;

  // ✅ Expected return = double the deposit
  const expectedReturn = deposit.amount * 2;
  const withdrawalEligible = maturityDate && new Date() >= maturityDate;

  return (
    <Layout>
      <h2>Your Investment Overview</h2>
      <p className="success-message">{message}</p>

      <div className="cards-grid">
        <div className="info-card">
          <h3>Amount Deposited</h3>
          <p>₦{deposit.amount?.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Expected Return</h3>
          <p>₦{expectedReturn.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Approval Date</h3>
          <p>{approvalDate ? approvalDate.toDateString() : "—"}</p>
        </div>

        <div className="info-card">
          <h3>Maturity Date</h3>
          <p>{maturityDate ? maturityDate.toDateString() : "—"}</p>
        </div>

        <div className="info-card">
          <h3>Withdrawal Eligibility</h3>
          <p>{withdrawalEligible ? "✅ Eligible" : "❌ Not Yet"}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
