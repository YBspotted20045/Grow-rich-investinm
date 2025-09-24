import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Investment.css";

const Investment = () => {
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("5000");
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
      setMessage("Please enter an amount.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/investments/start",
        { amount, plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Investment started successfully.");
      setAmount("");
      fetchInvestments();
    } catch (err) {
      console.error("Investment error:", err);
      setMessage(err.response?.data?.message || "Error starting investment.");
    }
  };

  return (
    <div className="investment-container">
      <h1>Start a New Investment</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="investment-form">
        <label>
          Investment Plan:
          <select value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="5000">₦5,000</option>
            <option value="10000">₦10,000</option>
            <option value="15000">₦15,000</option>
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

      <h2>Your Investments</h2>
      <ul className="investment-list">
        {investments.map((inv) => (
          <li key={inv._id}>
            {inv.amount} - {inv.plan} - {inv.status} -{" "}
            {new Date(inv.startDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Investment;
