// src/pages/Investment.jsx
import React, { useState, useEffect } from "react";
import axios from "../axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Investment = () => {
  const [amount, setAmount] = useState("");
  const [currentInvestment, setCurrentInvestment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchInvestment = async () => {
    try {
      const res = await axios.get("/investments/my");
      setCurrentInvestment(res.data.investment);
    } catch (err) {
      console.error("Error fetching investment:", err);
    }
  };

  useEffect(() => {
    fetchInvestment();
  }, []);

  const handleInvest = async (e) => {
    e.preventDefault();
    if (!amount) {
      setMessage("Please select an investment amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/investments/start", { amount: Number(amount) });
      setMessage(res.data.message);
      fetchInvestment(); // refresh current investment
    } catch (err) {
      console.error("Investment error:", err);
      setMessage(err.response?.data?.message || "Failed to start investment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Investment</h1>

        {message && (
          <p className="mb-4 text-center font-medium text-blue-600">{message}</p>
        )}

        {currentInvestment ? (
          <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-6">
            <h2 className="text-xl font-semibold mb-2">Current Investment</h2>
            <p>Amount: ₦{currentInvestment.amount}</p>
            <p>Status: {currentInvestment.status}</p>
            <p>
              Start Date:{" "}
              {new Date(currentInvestment.createdAt).toLocaleDateString()}
            </p>
            <p>
              Maturity Date:{" "}
              {currentInvestment.maturityDate
                ? new Date(currentInvestment.maturityDate).toLocaleDateString()
                : "Pending"}
            </p>
          </div>
        ) : (
          <p className="text-center mb-4">No active investment yet.</p>
        )}

        <form
          onSubmit={handleInvest}
          className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Amount</label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- Choose Amount --</option>
              <option value="10000">₦10,000</option>
              <option value="20000">₦20,000</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Start Investment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Investment;
