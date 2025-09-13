// src/pages/Deposits.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Deposits.css";

const Deposit = () => {
  const navigate = useNavigate();

  const handleDepositClick = (amount) => {
    navigate(`/vendor?amount=${amount}`);
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">Choose Your Deposit Plan</h2>

      <div className="deposit-options">
        <div className="deposit-card" onClick={() => handleDepositClick(5000)}>
          <h3>₦5,000</h3>
          <p>Starter Plan</p>
          <button className="deposit-btn">Deposit ₦5,000</button>
        </div>

        <div className="deposit-card" onClick={() => handleDepositClick(10000)}>
          <h3>₦10,000</h3>
          <p>Growth Plan</p>
          <button className="deposit-btn">Deposit ₦10,000</button>
        </div>

        <div className="deposit-card" onClick={() => handleDepositClick(15000)}>
          <h3>₦15,000</h3>
          <p>Premium Plan</p>
          <button className="deposit-btn">Deposit ₦15,000</button>
        </div>
      </div>
    </div>
  );
};

export default Deposits;
