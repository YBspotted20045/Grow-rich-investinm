import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png"; // replace with your logo path

const Dashboard = () => {
  // Mock data (replace with API data later)
  const [investments, setInvestments] = useState([
    { amount: 5000, date: "2025-08-01", referrals: 2 },
    { amount: 10000, date: "2025-08-05", referrals: 1 },
  ]);

  const calculateEarnings = (amount, date) => {
    const investDate = new Date(date);
    const today = new Date();
    const diffDays = Math.floor((today - investDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 10) {
      return amount * 2;
    }
    return 0;
  };

  return (
    <div className="dashboard-container">
      <header>
        <img className="logo" src={logo} alt="GrowRich Logo" />
        <h1>GrowRich Dashboard</h1>
      </header>

      <section className="investment-summary">
        <h2>Your Investments</h2>
        <table>
          <thead>
            <tr>
              <th>Amount (₦)</th>
              <th>Date</th>
              <th>Referrals</th>
              <th>Earnings after 10 days (₦)</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, index) => (
              <tr key={index}>
                <td>{inv.amount}</td>
                <td>{inv.date}</td>
                <td>{inv.referrals}</td>
                <td>{calculateEarnings(inv.amount, inv.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="actions">
        <button disabled>Withdraw</button>
        <button disabled>Invest More</button>
      </section>
    </div>
  );
};

export default Dashboard;
