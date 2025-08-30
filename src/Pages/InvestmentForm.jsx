import React, { useState } from "react";
import API from "../axios";

function Investments({ user }) {
  const [amount, setAmount] = useState("");

  const handleInvest = async () => {
    if (![5000, 10000, 15000].includes(Number(amount))) {
      alert("Invalid investment amount. Choose ₦5k, ₦10k, or ₦15k.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/invest",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Investment successful!");
    } catch (err) {
      alert("Error making investment.");
    }
  };

  return (
    <div className="card">
      <h3>Make an Investment</h3>
      <select value={amount} onChange={(e) => setAmount(e.target.value)}>
        <option value="">Select Amount</option>
        <option value="5000">₦5,000</option>
        <option value="10000">₦10,000</option>
        <option value="15000">₦15,000</option>
      </select>
      <button onClick={handleInvest}>Invest</button>
    </div>
  );
}

export default Investments;
