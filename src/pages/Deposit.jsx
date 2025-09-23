import React, { useState } from "react";
import API from "../axios.js";

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
      setMessage("Please enter amount and upload receipt.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("receipt", receipt);

    try {
      const res = await API.post("/deposits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Deposit uploaded successfully!");
      setAmount("");
      setReceipt(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload deposit.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Make a Deposit</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Submit
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Deposit;
