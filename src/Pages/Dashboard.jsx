import React from "react";
import "./Dashboard.css";

const Dashboard = ({ userData }) => {
  if (!userData) {
    return <p>Loading...</p>;
  }

  const { fullName, email, investment, investmentDate } = userData;

  // Calculate expected earnings after 10 days
  let earnings = 0;
  if (investment && investmentDate) {
    const investDate = new Date(investmentDate);
    const today = new Date();
    const diffDays = Math.floor(
      (today - investDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays >= 10) {
      earnings = investment * 2;
    }
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, {fullName}</h2>
      <div className="dashboard-info">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Investment:</strong> ₦{investment || 0}</p>
        <p><strong>Investment Date:</strong> {investmentDate ? new Date(investmentDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>Expected Earnings (after 10 days):</strong> ₦{earnings}</p>
      </div>
    </div>
  );
};

export default Dashboard;
