import React, { useState, useEffect } from "react";
import API from "../axios.js";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await API.get("/withdrawals", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWithdrawals(res.data.withdrawals || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWithdrawals();
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount) return setMessage("Enter withdrawal amount.");

    try {
      await API.post(
        "/withdrawals",
        { amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Withdrawal requested successfully.");
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to request withdrawal.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Request Withdrawal</h1>
      <form onSubmit={handleWithdraw} className="flex flex-col gap-4 max-w-md">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Withdraw
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Withdrawals</h2>
        {withdrawals.length > 0 ? (
          <ul className="list-disc pl-5">
            {withdrawals.map((w) => (
              <li key={w._id}>
                ₦{w.amount} - {w.status} - {new Date(w.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No withdrawal requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
