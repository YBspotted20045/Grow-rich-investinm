import React, { useState } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Deposit.css";

const Deposit = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setMessage("");
    setReceipt(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!receipt || !selectedAmount) {
      setMessage("Please select amount and upload a receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("amount", selectedAmount);

    try {
      const res = await API.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setMessage(`Receipt for ₦${selectedAmount.toLocaleString()} uploaded successfully.`);
        setReceipt(null);
        setSelectedAmount(null);
      } else {
        setMessage("Upload failed, try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Error uploading receipt. Please try again.");
    }
  };

  return (
    <Layout>
      <h1 className="deposit-title">Make a Deposit</h1>
      <p className="deposit-subtitle">Choose an investment amount to proceed:</p>

      <div className="deposit-options">
        {[10000, 20000].map((amount) => (
          <div
            key={amount}
            className={`deposit-card ${selectedAmount === amount ? "selected" : ""}`}
            onClick={() => handleAmountClick(amount)}
          >
            ₦{amount.toLocaleString()}
          </div>
        ))}
      </div>

      {selectedAmount && (
        <div className="deposit-form">
          <h2>Payment Instructions</h2>
          <p>
            Please pay <strong>₦{selectedAmount.toLocaleString()}</strong> to the account below
            and upload your receipt.
          </p>
          <div className="account-box">
            <p><strong>Bank:</strong> PalmPay</p>
            <p><strong>Account Number:</strong> 8984550866</p>
            <p><strong>Account Name:</strong> Nnaji Kelvin Somtochukwu</p>
          </div>

          <form onSubmit={handleUpload} className="upload-form">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setReceipt(e.target.files[0])}
              required
            />
            <button type="submit" className="upload-btn">Upload Receipt</button>
          </form>
        </div>
      )}

      {message && <p className="deposit-message">{message}</p>}
    </Layout>
  );
};

export default Deposit;
