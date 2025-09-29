// src/pages/AdminDeposits.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios.js"; // ✅ corrected import path
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

      const res = await axios.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const depositsData = Array.isArray(res.data)
        ? res.data
        : res.data.deposits || [];

      setDeposits(depositsData);
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
      await axios.put(
        `/admin/deposits/${depositId}/approve`,
        {},
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
      await axios.put(
        `/admin/deposits/${depositId}/reject`,
        {},
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
                <td>
                  {deposit.user?.fullName ||
                    deposit.user?.username ||
                    "Unknown"}
                </td>
                <td>₦{deposit.amount}</td>
                <td>
                  {deposit.receiptUrl ? (
                    <a
                      href={`${process.env.REACT_APP_API_URL}${deposit.receiptUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}${deposit.receiptUrl}`}
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
