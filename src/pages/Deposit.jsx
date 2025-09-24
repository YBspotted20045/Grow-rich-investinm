import React, { useState } from "react";
import axios from "../axios.js";
import "./Deposit.css";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receipt) {
      setMessage("Please provide both amount and receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("receipt", receipt);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/deposits/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message || "Deposit uploaded successfully.");
      setAmount("");
      setReceipt(null);
    } catch (err) {
      console.error("Deposit error:", err);
      setMessage(err.response?.data?.message || "Error uploading deposit.");
    }
  };

  return (
    <div className="deposit-container">
      <h1>Upload Deposit</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="deposit-form">
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount"
          />
        </label>

        <label>
          Upload Receipt:
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>

        <button type="submit">Submit Deposit</button>
      </form>
    </div>
  );
};

export default Deposit;
