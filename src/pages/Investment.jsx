import React, { useState, useEffect } from "react";
import API from "../axios.js";

const Investment = () => {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [investment, setInvestment] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const res = await API.get("/investments/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setInvestment(res.data.investment);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInvestment();
  }, []);

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!plan || !amount) return setMessage("Please select a plan and enter amount.");

    try {
      await API.post(
        "/investments",
        { plan, amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Investment started successfully!");
      setPlan("");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to start investment.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Start New Investment</h1>
      <form onSubmit={handleInvest} className="flex flex-col gap-4 max-w-md">
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Plan</option>
          <option value="5000">₦5,000 Plan</option>
          <option value="10000">₦10,000 Plan</option>
          <option value="15000">₦15,000 Plan</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Invest
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>

      {investment && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">Current Investment</h2>
          <p>Plan: ₦{investment.amount}</p>
          <p>Status: {investment.status}</p>
          <p>Start Date: {new Date(investment.startDate).toLocaleDateString()}</p>
          <p>Maturity Date: {new Date(investment.maturityDate).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Investment;
