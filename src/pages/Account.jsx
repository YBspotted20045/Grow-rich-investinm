import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Account = () => {
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBankName(res.data.user.bankName || "");
        setAccountName(res.data.user.accountName || "");
        setAccountNumber(res.data.user.accountNumber || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/users/bank",
        { bankName, accountName, accountNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Account updated successfully");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Bank / Account Details</h1>

        {message && <p className="mb-4 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
