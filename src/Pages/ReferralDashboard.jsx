import React, { useState, useEffect } from "react";
import "./Referral.css";

const ReferralDashboard = () => {
  // Sample user and referral data
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    investment: 10000, // initial investment
    investmentDate: new Date("2025-08-05"), // example date
    referralCode: "REF123",
    referrals: [
      { name: "Jane Smith", email: "jane@example.com", amount: 5000 },
      { name: "Bob Johnson", email: "bob@example.com", amount: 10000 },
    ],
  });

  const [maturedAmount, setMaturedAmount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const now = new Date();
    const investmentDate = new Date(userData.investmentDate);
    const diffTime = now - investmentDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const remaining = 10 - diffDays;
    setDaysLeft(remaining > 0 ? remaining : 0);
    setMaturedAmount(diffDays >= 10 ? userData.investment * 2 : 0);
  }, [userData]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userData.fullName}</h2>
      <div className="investment-info">
        <p>Email: {userData.email}</p>
        <p>Investment Amount: ₦{userData.investment}</p>
        <p>
          Maturity Status:{" "}
          {maturedAmount > 0
            ? `Matured! ₦${maturedAmount}`
            : `Pending, ${daysLeft} day(s) left`}
        </p>
        <p>Your Referral Code: {userData.referralCode}</p>
      </div>

      <h3>Your Referrals</h3>
      {userData.referrals.length === 0 ? (
        <p>You have no referrals yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Investment</th>
            </tr>
          </thead>
          <tbody>
            {userData.referrals.map((ref, index) => (
              <tr key={index}>
                <td>{ref.name}</td>
                <td>{ref.email}</td>
                <td>₦{ref.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReferralDashboard;
