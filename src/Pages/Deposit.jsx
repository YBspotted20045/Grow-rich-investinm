// src/pages/Deposits.jsx
import React from "react";
import "./Deposit.css";

const packages = [
  {
    amount: 5000,
    desc: "Start with ₦5,000 and grow your wealth.",
  },
  {
    amount: 10000,
    desc: "Double your returns with ₦10,000.",
  },
  {
    amount: 15000,
    desc: "Go premium with ₦15,000 investment.",
  },
];

const Deposits = () => {
  return (
    <div className="deposit-container">
      <h2 className="deposit-title">💰 Deposit Packages</h2>

      <div className="deposit-grid">
        {packages.map((pkg, index) => (
          <div key={index} className="deposit-card">
            <h3 className="deposit-package">₦{pkg.amount.toLocaleString()} Package</h3>
            <p className="deposit-description">{pkg.desc}</p>
            <button className="deposit-btn">
              Deposit ₦{pkg.amount.toLocaleString()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deposits;
