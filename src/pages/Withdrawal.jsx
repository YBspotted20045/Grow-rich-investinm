// src/pages/Withdrawal.jsx
import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data.withdrawals || []);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) {
      setMessage("⚠️ Please enter an amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/withdrawals/request",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "✅ Withdrawal requested successfully.");
      setAmount("");
      fetchWithdrawals();
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage(err.response?.data?.message || "❌ Error requesting withdrawal.");
    }
  };

  return (
    <div className="withdrawal-wrapper">
      <h1 className="withdrawal-title">💸 Request Withdrawal</h1>

      {message && <p className="withdrawal-message">{message}</p>}

      {/* Request Card */}
      <div className="withdrawal-card">
        <form onSubmit={handleSubmit} className="withdrawal-form">
          <label htmlFor="amount">Amount (₦)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
          />
          <button type="submit">Request Withdrawal</button>
        </form>
      </div>

      {/* History Card */}
      <div className="withdrawal-card">
        <h2>Your Withdrawals</h2>
        {withdrawals.length === 0 ? (
          <p className="no-withdrawals">No withdrawals yet.</p>
        ) : (
          <ul className="withdrawal-list">
            {withdrawals.map((w) => (
              <li key={w._id}>
                <span>₦{w.amount.toLocaleString()}</span>
                <span className={`status ${w.status}`}>{w.status}</span>
                <span>{new Date(w.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;
