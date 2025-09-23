// src/pages/Withdrawal.jsx
import React, { useState, useEffect } from "react";
import axios from "../axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("/withdrawals/my");
      setWithdrawals(res.data.withdrawals);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (!amount) {
      setMessage("Please enter an amount to withdraw.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/withdrawals/request", { amount: Number(amount) });
      setMessage(res.data.message);
      fetchWithdrawals(); // refresh withdrawal list
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage(err.response?.data?.message || "Failed to request withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Withdrawals</h1>

        {message && (
          <p className="mb-4 text-center font-medium text-blue-600">{message}</p>
        )}

        <form
          onSubmit={handleWithdrawal}
          className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-6"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Withdrawal Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded"
              min="1000"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Processing..." : "Request Withdrawal"}
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Withdrawal History</h2>
          {withdrawals.length === 0 ? (
            <p>No withdrawals yet.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Requested On</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w._id}>
                    <td className="p-2 border">₦{w.amount}</td>
                    <td className="p-2 border">{w.status}</td>
                    <td className="p-2 border">
                      {new Date(w.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
