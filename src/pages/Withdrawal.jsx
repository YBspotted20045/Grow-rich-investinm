import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);

  const token = localStorage.getItem("token");

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("/withdrawals/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return setMessage("Withdrawal amount is required");

    try {
      const res = await axios.post("/withdrawals/request", { amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      fetchWithdrawals();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Request Withdrawal</h1>

        {message && <p className="mb-4 text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="number"
            placeholder="Withdrawal Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Request Withdrawal
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Your Withdrawals</h2>
        <ul>
          {withdrawals.map((w) => (
            <li key={w._id}>
              ₦{w.amount} - {w.status} - {new Date(w.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Withdrawal;
