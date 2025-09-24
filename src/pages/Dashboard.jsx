import React, { useEffect, useState } from "react";
import axios from "../axiosjs";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setDeposits(res.data.deposits);
        setInvestment(res.data.investment);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.fullName}</h1>

      <section className="dashboard-section">
        <h2>Investment</h2>
        {investment ? (
          <div className="investment-card">
            <p>Amount: ₦{investment.amount}</p>
            <p>Status: {investment.status}</p>
            <p>Start: {new Date(investment.startDate).toLocaleDateString()}</p>
            <p>Maturity: {new Date(investment.maturityDate).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No active investment.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Deposits</h2>
        {deposits.length ? (
          <ul className="deposit-list">
            {deposits.map((d) => (
              <li key={d._id}>
                Amount: ₦{d.amount} | Status: {d.status} | Date: {new Date(d.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No deposits yet.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Referrals</h2>
        {user.referrals && user.referrals.length ? (
          <ul className="referral-list">
            {user.referrals.map((r) => (
              <li key={r._id}>
                {r.fullName} - ₦{r.investmentAmount} invested
              </li>
            ))}
          </ul>
        ) : (
          <p>No referrals yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
