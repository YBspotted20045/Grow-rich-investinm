// src/pages/Deposits.jsx
import React, { useState } from "react";
import "./Deposit.css";

const packages = [
  {
    amount: 10000,
    desc: "Start strong with ₦10,000 and grow your wealth.",
  },
  {
    amount: 20000,
    desc: "Boost your returns with ₦20,000 premium package.",
  },
];

const Deposits = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const handleDeposit = (amount) => {
    setSelectedAmount(amount);
  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receipt || !selectedAmount) {
      alert("Please select an amount and upload receipt!");
      return;
    }

    // TODO: connect with backend API later
    alert(
      `Deposit request submitted:\nAmount: ₦${selectedAmount}\nReceipt: ${receipt.name}`
    );

    setSelectedAmount(null);
    setReceipt(null);
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">💰 Deposit Packages</h2>

      <div className="deposit-grid">
        {packages.map((pkg, index) => (
          <div key={index} className="deposit-card">
            <h3 className="deposit-package">₦{pkg.amount.toLocaleString()}</h3>
            <p className="deposit-description">{pkg.desc}</p>
            <button
              className="deposit-btn"
              onClick={() => handleDeposit(pkg.amount)}
            >
              Deposit ₦{pkg.amount.toLocaleString()}
            </button>
          </div>
        ))}
      </div>

      {selectedAmount && (
        <div className="deposit-form">
          <h3>Complete Your Deposit</h3>
          <p>
            Please transfer{" "}
            <strong>₦{selectedAmount.toLocaleString()}</strong> to the account
            below:
          </p>
          <div className="bank-details">
            <p>🏦 Bank: First Bank</p>
            <p>👤 Account Name: John Doe</p>
            <p>💳 Account Number: 1234567890</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="receipt">Upload Payment Receipt:</label>
            <input
              type="file"
              id="receipt"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              required
            />
            <button type="submit" className="submit-btn">
              Submit Deposit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Deposits;
