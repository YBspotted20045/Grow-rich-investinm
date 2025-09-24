import React, { useState, useEffect } from "react";
import axios from "../axios.js";
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
      setMessage("Please enter an amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/withdrawals/request",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Withdrawal requested successfully.");
      setAmount("");
      fetchWithdrawals();
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage(err.response?.data?.message || "Error requesting withdrawal.");
    }
  };

  return (
    <div className="withdrawal-container">
      <h1>Request Withdrawal</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="withdrawal-form">
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
          />
        </label>

        <button type="submit">Request Withdrawal</button>
      </form>

      <h2>Your Withdrawals</h2>
      <ul className="withdrawal-list">
        {withdrawals.map((w) => (
          <li key={w._id}>
            {w.amount} - {w.status} - {new Date(w.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Withdrawal;
