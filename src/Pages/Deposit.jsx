// src/pages/Deposit.jsx
import React, { useState } from "react";
import "./Deposit.css";

const packages = [
  { amount: 10000, desc: "Secure your future with ₦10,000 investment." },
  { amount: 20000, desc: "Boost your wealth with ₦20,000 premium plan." },
];

const Deposit = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">💰 Deposit Packages</h2>

      <div className="deposit-grid">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`deposit-card ${selected === pkg.amount ? "active" : ""}`}
          >
            <h3 className="deposit-package">₦{pkg.amount.toLocaleString()}</h3>
            <p className="deposit-description">{pkg.desc}</p>
            <button
              className="deposit-btn"
              onClick={() => setSelected(pkg.amount)}
            >
              Deposit ₦{pkg.amount.toLocaleString()}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="deposit-details">
          <h3 className="details-title">Complete Your Payment</h3>
          <div className="account-card">
            <p><strong>Bank Name:</strong> Access Bank</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Account Name:</strong> GrowRich Investments</p>
            <p className="note">
              💡 Please transfer exactly ₦{selected.toLocaleString()} and upload your payment receipt below.
            </p>
          </div>

          <div className="upload-section">
            <label className="upload-label">Upload Payment Receipt</label>
            <input type="file" className="upload-input" />
            <button className="confirm-btn">Submit Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
