// src/pages/AdminDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "./axios";   // ✅ use same API instance
import "./AdminDeposits.css";

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await API.get("/deposits/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDeposits(res.data || []);
    } catch (err) {
      console.error("Fetch deposits error:", err);
      setError(err.response?.data?.message || "Failed to fetch deposits.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/deposits/${depositId}/status`,
        { status: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error("Approve error:", err);
      setError("Failed to approve deposit.");
    }
  };

  const handleReject = async (depositId) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/deposits/${depositId}/status`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error("Reject error:", err);
      setError("Failed to reject deposit.");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) return <p>Loading deposits...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-deposits-container">
      <h1>Manage Deposits</h1>
      {deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <table className="deposits-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Receipt</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit._id}>
                <td>{deposit.userId?.username || deposit.userId?.email || "Unknown"}</td>
                <td>₦{deposit.amount}</td>
                <td>
                  {deposit.receiptUrl ? (
                    <a
                      href={`https://grow-0nfm.onrender.com${deposit.receiptUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`https://grow-0nfm.onrender.com${deposit.receiptUrl}`}
                        alt="Receipt"
                        style={{ width: "120px", borderRadius: "6px" }}
                      />
                    </a>
                  ) : (
                    "No receipt"
                  )}
                </td>
                <td>{deposit.status}</td>
                <td>
                  <button
                    onClick={() => handleApprove(deposit._id)}
                    className="approve-btn"
                    disabled={deposit.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(deposit._id)}
                    className="reject-btn"
                    disabled={deposit.status === "rejected"}
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

export default AdminDeposits;
