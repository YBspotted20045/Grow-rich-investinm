// src/pages/Withdrawal.jsx
import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ Fetch all user's withdrawals
  const fetchWithdrawals = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const res = await axios.get("/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success === false) {
        setMessage(res.data.message || "Failed to load withdrawals.");
        return;
      }

      setWithdrawals(res.data.withdrawals || []);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);
      setMessage(
        err.response?.data?.message ||
          "❌ Unable to fetch your withdrawal history."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // ✅ Handle withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setMessage("⚠️ Please enter a valid withdrawal amount.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const res = await axios.post(
        "/withdrawals/request",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success === false) {
        throw new Error(res.data.message || "Withdrawal request failed.");
      }

      setMessage(res.data.message || "✅ Withdrawal requested successfully!");
      setAmount("");
      fetchWithdrawals();
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage(
        err.response?.data?.message ||
          err.message ||
          "❌ Error requesting withdrawal."
      );
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Request Withdrawal"}
          </button>
        </form>
      </div>

      {/* History Card */}
      <div className="withdrawal-card">
        <h2>Your Withdrawals</h2>
        {fetching ? (
          <p>Loading your withdrawals...</p>
        ) : withdrawals.length === 0 ? (
          <p className="no-withdrawals">No withdrawals yet.</p>
        ) : (
          <ul className="withdrawal-list">
            {withdrawals.map((w) => (
              <li key={w._id}>
                <span>₦{Number(w.amount).toLocaleString()}</span>
                <span
                  className={`status ${w.status.toLowerCase()}`}
                  style={{
                    color:
                      w.status === "approved"
                        ? "green"
                        : w.status === "rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                </span>
                <span>
                  {new Date(w.createdAt).toLocaleString("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;
