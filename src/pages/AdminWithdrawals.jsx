// src/pages/AdminWithdrawals.jsx
import React, { useEffect, useState } from "react";
import API from "./axios"; // ✅ correct import path
import "./AdminWithdrawals.css";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all withdrawals
  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await API.get("/admin/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Ensure data is always an array
      const withdrawalsData = Array.isArray(res.data.withdrawals)
        ? res.data.withdrawals
        : res.data.withdrawals || [];

      setWithdrawals(withdrawalsData);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);
      setError(err.response?.data?.message || "Failed to fetch withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve withdrawal
  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/admin/withdrawals/${id}`,
        { action: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Withdrawal approved successfully!");
      fetchWithdrawals();
    } catch (err) {
      console.error("Approve error:", err);
      setError(err.response?.data?.message || "Failed to approve withdrawal.");
    }
  };

  // ✅ Reject withdrawal
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/admin/withdrawals/${id}`,
        { action: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("❌ Withdrawal rejected.");
      fetchWithdrawals();
    } catch (err) {
      console.error("Reject error:", err);
      setError(err.response?.data?.message || "Failed to reject withdrawal.");
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
              <th>Email</th>
              <th>Amount</th>
              <th>Bank Name</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Wallet Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {withdrawals.map((w) => (
              <tr key={w._id}>
                <td>{w.userId?.username || "Unknown"}</td>
                <td>{w.userId?.email || "N/A"}</td>
                <td>₦{Number(w.amount).toLocaleString()}</td>
                <td>{w.userId?.bankName || "N/A"}</td>
                <td>{w.userId?.accountName || "N/A"}</td>
                <td>{w.userId?.accountNumber || "N/A"}</td>
                <td>{w.userId?.walletAddress || "N/A"}</td>
                <td
                  className={`status ${
                    w.status === "approved"
                      ? "status-approved"
                      : w.status === "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}
                >
                  {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                </td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(w._id)}
                    disabled={w.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(w._id)}
                    disabled={w.status === "rejected"}
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
