import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const res = await API.get("/investments/me");
        if (res.data.success) {
          setInvestment(res.data.investment);
          setEarnings(res.data.earnings);
        }
      } catch (err) {
        console.error("Error fetching investment:", err);
      }
    };
    fetchInvestment();
  }, []);

  const defaultData = { amount: 0, status: "no investment", maturityDate: null };
  const defaultEarnings = { maxPayout: 0, accrued: 0, available: 0 };

  const inv = investment || defaultData;
  const earn = earnings || defaultEarnings;

  return (
    <Layout>
      <h1 className="dashboard-heading">
        Welcome back, <span>{user ? user.username : "Investor"}</span>
      </h1>

      <h2 className="overview-title">Your Investment Overview</h2>

      {!investment && <p className="no-investment">⚠️ No active investment yet</p>}

      <div className="cards-grid">
        <div className="info-card">
          <h3>Investment Amount</h3>
          <p>₦{inv.amount.toLocaleString()}</p>
        </div>
        <div className="info-card">
          <h3>Expected Return</h3>
          <p>₦{earn.maxPayout.toLocaleString()}</p>
        </div>
        <div className="info-card">
          <h3>Accrued Earnings</h3>
          <p>₦{earn.accrued.toLocaleString()}</p>
        </div>
        <div className="info-card">
          <h3>Available to Withdraw</h3>
          <p>₦{earn.available.toLocaleString()}</p>
        </div>
        <div className="info-card">
          <h3>Maturity Date</h3>
          <p>{inv.maturityDate ? new Date(inv.maturityDate).toDateString() : "—"}</p>
        </div>
        <div className="info-card status-card">
          <h3>Status</h3>
          <p className={inv.status.replace(" ", "-")}>{inv.status}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
