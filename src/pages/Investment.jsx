import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Investment.css";

const Investment = () => {
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("10000"); // default plan
  const [message, setMessage] = useState("");
  const [investments, setInvestments] = useState([]);

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/investments/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestments(res.data.investments || []);
    } catch (err) {
      console.error("Fetch investments error:", err);
    }
  };

  useEffect(() => {
    fetchInvestments();
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
        "/investments/start",
        { amount, plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "✅ Investment started successfully.");
      setAmount("");
      fetchInvestments();
    } catch (err) {
      console.error("Investment error:", err);
      setMessage(err.response?.data?.message || "❌ Error starting investment.");
    }
  };

  return (
    <div className="investment-wrapper">
      <h1 className="investment-title">📈 Start a New Investment</h1>
      {message && <p className="investment-message">{message}</p>}

      {/* Investment Form Card */}
      <div className="investment-card">
        <form onSubmit={handleSubmit} className="investment-form">
          <label>
            Investment Plan:
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="10000">₦10,000</option>
              <option value="20000">₦20,000</option>
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter investment amount"
            />
          </label>
          <button type="submit">Invest Now</button>
        </form>
      </div>

      {/* Investment History Card */}
      <div className="investment-card">
        <h2>Your Investments</h2>
        {investments.length === 0 ? (
          <p className="no-investments">No investments yet.</p>
        ) : (
          <ul className="investment-list">
            {investments.map((inv) => (
              <li key={inv._id}>
                <span>₦{inv.amount.toLocaleString()}</span>
                <span className={`status ${inv.status}`}>{inv.status}</span>
                <span>{new Date(inv.startDate).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Investment;
