// src/Pages/Deposits.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Deposit.css";

const Deposit = () => {
  const navigate = useNavigate();

  const handleDeposit = (amount) => {
    // redirect to vendors page with chosen amount
    navigate("/vendors", { state: { amount } });
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">Make a Deposit</h2>
      <p className="deposit-sub">Select an amount to continue:</p>

      <div className="deposit-options">
        {[5000, 10000, 15000].map((amt) => (
          <button
            key={amt}
            className="deposit-btn"
            onClick={() => handleDeposit(amt)}
          >
            ₦{amt.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Deposits;
