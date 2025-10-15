import React, { useState, useEffect } from "react";
import API from "./axios";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ Fetch user's withdrawals
  const fetchWithdrawals = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const res = await API.get("/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setWithdrawals(res.data.withdrawals || []);
      } else {
        setMessage("⚠️ Failed to load withdrawals.");
      }
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

      const res = await API.post(
        "/withdrawals/request",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "Withdrawal request failed.");
      }

      setMessage(res.data.message || "✅ Withdrawal requested successfully!");
      setAmount("");
      fetchWithdrawals();

      setTimeout(() => setMessage(""), 8000);
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage(
        err.response?.data?.message ||
          err.message ||
          "❌ Error requesting withdrawal."
      );
      setTimeout(() => setMessage(""), 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdrawal-wrapper">
      <h1 className="withdrawal-title">💸 Request Withdrawal</h1>

      {/* 🔔 Rule Box */}
      <div className="withdrawal-rule">
        ⚠️ <strong>Important:</strong> You must refer <b>2 new users</b> who have
        both made <b>approved deposits</b> before you can withdraw.
      </div>

      {/* Withdrawal Form */}
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

        {/* ✅ Message fixed to bottom of card */}
        {message && (
          <div
            className="withdrawal-message bottom-message"
            style={{
              background:
                message.includes("❌") || message.includes("error")
                  ? "#ffe6e6"
                  : message.includes("✅")
                  ? "#e8ffe8"
                  : "#fff6e6",
              borderLeft: "5px solid",
              borderColor: message.includes("❌")
                ? "#d9534f"
                : message.includes("✅")
                ? "#28a745"
                : "#f0ad4e",
              color: "#333",
            }}
          >
            {message}
          </div>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="withdrawal-card history-card">
        <h2>Your Withdrawals</h2>
        {fetching ? (
          <p>Loading your withdrawals...</p>
        ) : withdrawals.length === 0 ? (
          <p className="no-withdrawals">No withdrawals yet.</p>
        ) : (
          <ul className="withdrawal-list">
            {withdrawals.map((w) => (
              <li key={w._id} className="withdrawal-item">
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
                <span className="withdrawal-date">
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
