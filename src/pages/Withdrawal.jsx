// src/pages/Withdrawal.jsx
import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [investment, setInvestment] = useState(null);
  const [message, setMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ Fetch active investment from backend
  const fetchInvestment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const res = await axios.get("/investments/my-active", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.investment) {
        setInvestment(res.data.investment);
      } else {
        setInvestment(null);
      }
    } catch (err) {
      console.error("Fetch investment error:", err);
      setInvestment(null);
    }
  };

  // ✅ Fetch withdrawal history
  const fetchWithdrawals = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    fetchInvestment();
    fetchWithdrawals();
  }, []);

  // ✅ Handle withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/withdrawals/request",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "✅ Withdrawal requested successfully!");
      fetchWithdrawals();
      fetchInvestment();
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

      <div className="withdrawal-card">
        {investment ? (
          <form onSubmit={handleSubmit} className="withdrawal-form">
            <p>
              <strong>Active Investment:</strong> ₦
              {Number(investment.amount).toLocaleString()}
            </p>
            <p>
              <strong>Maturity Date:</strong>{" "}
              {new Date(investment.maturityDate).toLocaleDateString("en-NG")}
            </p>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Request Withdrawal"}
            </button>
          </form>
        ) : (
          <p className="no-investment">❌ No active investment</p>
        )}
      </div>

      {/* Withdrawal History */}
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
