import React, { useState } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Deposit.css";

const Deposit = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setMessage("");
    setError("");
    setReceipt(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!receipt || !selectedAmount) {
      setError("⚠️ Please select an amount and upload a receipt.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Start investment
      const investRes = await API.post("/investments/start", {
        amount: selectedAmount,
        plan: "default",
      });

      if (!investRes.data.success) {
        setError("Failed to create investment. Try again.");
        setLoading(false);
        return;
      }

      const investmentId = investRes.data.investment._id;

      // Step 2: Upload deposit receipt
      const formData = new FormData();
      formData.append("receipt", receipt);
      formData.append("amount", selectedAmount);
      formData.append("investmentId", investmentId);

      const depositRes = await API.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (depositRes.data.deposit) {
        setMessage(
          depositRes.data.message ||
            `✅ Receipt for ₦${selectedAmount.toLocaleString()} uploaded successfully. Pending admin approval.`
        );
        setReceipt(null);
        setSelectedAmount(null);
        e.target.reset(); // reset form input field
      } else {
        setError("Upload failed, try again.");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError(
        err.response?.data?.message ||
          "❌ Error processing deposit. Please try again."
      );
    } finally {
      setLoading(false);
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
            className={`deposit-card ${
              selectedAmount === amount ? "selected" : ""
            }`}
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
            Please pay <strong>₦{selectedAmount.toLocaleString()}</strong> to the
            account below and upload your receipt.
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
            <button type="submit" className="upload-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : "Upload Receipt"}
            </button>
          </form>
        </div>
      )}

      {message && (
        <p className="deposit-message" style={{ color: "green" }}>{message}</p>
      )}
      {error && (
        <p className="deposit-message" style={{ color: "red" }}>{error}</p>
      )}
    </Layout>
  );
};

export default Deposit;
