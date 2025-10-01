import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [investment, setInvestment] = useState(null);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/investments/me");
        if (res.data.success) {
          setInvestment(res.data.investment || null);
          setEarnings(res.data.earnings || null);
        }
      } catch (err) {
        console.error("Error fetching investment data:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!investment) {
    return (
      <Layout>
        <h2>Your Investment Overview</h2>
        <p>⚠️ No active investment yet</p>
      </Layout>
    );
  }

  const withdrawalEligible = earnings?.available > 0;

  return (
    <Layout>
      <h2>Your Investment Overview</h2>

      <div className="cards-grid">
        <div className="info-card">
          <h3>Amount Invested</h3>
          <p>₦{investment.amount?.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Expected Return</h3>
          <p>₦{earnings?.maxPayout?.toLocaleString()}</p>
        </div>

        <div className="info-card">
          <h3>Maturity Date</h3>
          <p>
            {investment.maturityDate
              ? new Date(investment.maturityDate).toDateString()
              : "—"}
          </p>
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
