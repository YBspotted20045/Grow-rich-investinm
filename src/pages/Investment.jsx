import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Investment = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [investment, setInvestment] = useState(null);

  const token = localStorage.getItem("token");

  const fetchInvestment = async () => {
    try {
      const res = await axios.get("/investments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvestment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvestment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return setMessage("Investment amount is required");

    try {
      const res = await axios.post("/investments/start", { amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      fetchInvestment();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Investment failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Start New Investment</h1>

        {message && <p className="mb-4 text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <select
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Investment Amount</option>
            <option value="10000">₦10,000</option>
            <option value="20000">₦20,000</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Invest
          </button>
        </form>

        {investment && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Your Current Investment</h2>
            <p>Amount: ₦{investment.amount}</p>
            <p>Status: {investment.status}</p>
            <p>Start Date: {new Date(investment.startDate).toLocaleDateString()}</p>
            <p>Maturity Date: {new Date(investment.maturityDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Investment;
