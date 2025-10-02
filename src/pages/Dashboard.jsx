import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios"; // ✅ fixed import
import "./Dashboard.css";

const Dashboard = () => {
  const [investment, setInvestment] = useState(null);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 🔹 Updated API route to fetch deposits
        const res = await API.get("/deposits/my"); // make sure backend has this route

        if (res.data.success) {
          const deposits = res.data.deposits || [];

          // 🔹 Pick the last approved deposit
          const activeDeposit = deposits.find(dep => dep.status === "approved");

          if (activeDeposit) {
            setInvestment({
              amount: activeDeposit.amount,
              status: activeDeposit.status,
              maturityDate: activeDeposit.approvedAt
                ? new Date(new Date(activeDeposit.approvedAt).getTime() + 14 * 24 * 60 * 60 * 1000) // 14-day maturity
                : null,
            });

            // 🔹 Set earnings based on deposit, adapt as needed
            setEarnings({
              available: activeDeposit.earningsAvailable || 0,
              maxPayout: activeDeposit.maxPayout || 0,
            });
          } else {
            setInvestment(null);
            setEarnings(null);
          }
        }
      } catch (err) {
        console.error("Error fetching deposit data:", err);
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
