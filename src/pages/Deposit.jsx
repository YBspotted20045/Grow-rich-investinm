// src/pages/Deposit.jsx
import React, { useState } from "react";
import axios from "../axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !file) {
      setMessage("Please enter amount and select a receipt file.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("receipt", file);

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/deposits/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message);
      setAmount("");
      setFile(null);
    } catch (err) {
      console.error("Deposit upload error:", err);
      setMessage(
        err.response?.data?.message || "Failed to upload deposit."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Upload Deposit</h1>

        {message && (
          <p className="mb-4 text-center font-medium text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter deposit amount"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Receipt File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Uploading..." : "Upload Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
