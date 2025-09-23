import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");
  const [deposits, setDeposits] = useState([]);

  const token = localStorage.getItem("token");

  const fetchDeposits = async () => {
    try {
      const res = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeposits(res.data.deposits);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receipt) return setMessage("Amount and receipt are required");

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("receipt", receipt);

    try {
      const res = await axios.post("/deposits/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      fetchDeposits(); // refresh deposit list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Upload Deposit Receipt</h1>

        {message && <p className="mb-4 text-red-600">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="number"
            placeholder="Deposit Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReceipt(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Upload
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">Your Deposits</h2>
        <ul>
          {deposits.map((d) => (
            <li key={d._id}>
              ₦{d.amount} - {d.status} - {new Date(d.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Deposit;
