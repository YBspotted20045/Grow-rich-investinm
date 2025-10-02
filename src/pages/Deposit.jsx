import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("receipt", receipt);

      const res = await API.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage(res.data.message || "Deposit uploaded successfully!");
        setAmount("");
        setReceipt(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ clear input
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      if (err.response?.data?.message) {
        setError("❌ " + err.response.data.message);
      } else {
        setError("❌ Error processing deposit. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Make a Deposit</h2>
      <p>Choose an investment amount to proceed:</p>

      <div className="cards-grid">
        {[10000, 20000].map((amt) => (
          <button
            key={amt}
            type="button"
            className={`info-card ${amount === String(amt) ? "selected" : ""}`}
            onClick={() => setAmount(String(amt))}
          >
            ₦{amt.toLocaleString()}
          </button>
        ))}
      </div>

      {amount && (
        <div className="info-card mt-4">
          <h3>Payment Instructions</h3>
          <p>
            Please pay <strong>₦{Number(amount).toLocaleString()}</strong> to the account below and upload your receipt.
          </p>
          <p><strong>Bank:</strong> PalmPay</p>
          <p><strong>Account Number:</strong> 8984550866</p>
          <p><strong>Account Name:</strong> Nnaji Kelvin Somtochukwu</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef} // ✅ allow clearing
          required
        />
        <button type="submit" disabled={loading || !amount || !receipt}>
          {loading ? "Uploading..." : "Upload Receipt"}
        </button>
      </form>

      {message && <p style={{ color: "green" }}>✅ {message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Layout>
  );
};

export default Deposit;
