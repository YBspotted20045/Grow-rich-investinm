import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import "./Account.css";

const Account = () => {
  const [user, setUser] = useState({});
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setBankName(res.data.user.bankName || "");
      setAccountNumber(res.data.user.accountNumber || "");
      setAccountName(res.data.user.accountName || "");
    } catch (err) {
      console.error("Fetch user error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/users/bank",
        { bankName, accountNumber, accountName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Account details updated successfully!");
    } catch (err) {
      console.error("Update bank info error:", err);
      setMessage("Failed to update account details.");
    }
  };

  return (
    <div className="account-container">
      <h1>My Bank / Account Details</h1>
      {message && <p className="account-message">{message}</p>}
      <form className="account-form" onSubmit={handleUpdate}>
        <label>
          Bank Name:
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </label>
        <label>
          Account Number:
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Account Name:
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default Account;
