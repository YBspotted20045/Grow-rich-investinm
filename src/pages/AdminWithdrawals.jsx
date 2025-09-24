import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./AdminWithdrawals.css";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/admin/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data);
    } catch (err) {
      console.error("Fetch withdrawals error:", err);
    }
  };

  const handleAction = async (withdrawalId, action) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `/admin/withdrawals/${withdrawalId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWithdrawals(); // Refresh list
    } catch (err) {
      console.error("Withdrawal action error:", err);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="admin-withdrawals-container">
      <h1>Manage Withdrawals</h1>
      <table className="withdrawals-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td>{withdrawal.userFullName}</td>
              <td>₦{withdrawal.amount}</td>
              <td>{withdrawal.status}</td>
              <td>
                <button
                  onClick={() => handleAction(withdrawal._id, "approved")}
                  className="approve-btn"
                  disabled={withdrawal.status === "approved"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(withdrawal._id, "rejected")}
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
    </div>
  );
};

export default AdminWithdrawals;
