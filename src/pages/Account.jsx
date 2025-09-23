import React, { useState, useEffect } from "react";
import API from "../axios.js";

const Account = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await API.get("/account", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBankName(res.data.bankName || "");
        setAccountNumber(res.data.accountNumber || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccount();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        "/account",
        { bankName, accountNumber },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage("Account information updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update account information.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Bank / Account Info</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Update
        </button>
        {message && <p className="mt-2 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default Account;
