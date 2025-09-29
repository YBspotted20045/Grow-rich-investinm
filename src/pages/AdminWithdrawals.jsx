// src/pages/AdminWithdrawals.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./AdminWithdrawals.css";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await axios.get("/admin/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const withdrawalsData = Array.isArray(res.data)
        ? res.data
        : res.data.withdrawals || [];

      setWithdrawals(withdrawalsData);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);
      setError(err.response?.data?.message || "Failed to fetch withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawalId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/admin/withdrawals/${withdrawalId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWithdrawals();
    } catch (err) {
      console.error("Approve error:", err);
      setError("Failed to approve withdrawal.");
    }
  };

  const handleReject = async (withdrawalId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/admin/withdrawals/${withdrawalId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWithdrawals();
    } catch (err) {
      console.error("Reject error:", err);
      setError("Failed to reject withdrawal.");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  if (loading) return <p>Loading withdrawals...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-withdrawals-container">
      <h1>Manage Withdrawals</h1>
      {withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <table className="withdrawals-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Account / Wallet</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td>
                  {withdrawal.user?.fullName ||
                    withdrawal.user?.username ||
                    "Unknown"}
                </td>
                <td>₦{withdrawal.amount}</td>
                <td>
                  {withdrawal.accountDetails
                    ? `${withdrawal.accountDetails.bankName} - ${withdrawal.accountDetails.accountNumber}`
                    : "N/A"}
                </td>
                <td>{withdrawal.status}</td>
                <td>
                  <button
                    onClick={() => handleApprove(withdrawal._id)}
                    className="approve-btn"
                    disabled={withdrawal.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(withdrawal._id)}
                    className="reject-btn"
                    disabled={withdrawal.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminWithdrawals;
