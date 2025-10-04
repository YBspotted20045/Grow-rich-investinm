// src/pages/AdminDeposits.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout.jsx";
import API from "./axios";
import "./AdminDeposits.css";

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all deposits
  const fetchDeposits = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await API.get("/deposits/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Defensive check
      if (Array.isArray(res.data)) {
        setDeposits(res.data);
      } else if (res.data.deposits) {
        setDeposits(res.data.deposits);
      } else {
        setDeposits([]);
      }
    } catch (err) {
      console.error("Fetch deposits error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch deposits.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve deposit
  const handleApprove = async (depositId) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/deposits/${depositId}/status`,
        { status: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchDeposits();
      alert("✅ Deposit approved successfully!");
    } catch (err) {
      console.error("Approve error:", err);
      setError("Failed to approve deposit.");
    }
  };

  // ✅ Reject deposit
  const handleReject = async (depositId) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/deposits/${depositId}/status`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchDeposits();
      alert("❌ Deposit rejected successfully!");
    } catch (err) {
      console.error("Reject error:", err);
      setError("Failed to reject deposit.");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-deposits-container">
        <h1>Manage Deposits</h1>

        {loading ? (
          <p>Loading deposits...</p>
        ) : error ? (
          <p style={{ color: "red" }}>⚠️ {error}</p>
        ) : deposits.length === 0 ? (
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
                  <td>₦{deposit.amount?.toLocaleString()}</td>
                  <td>
                    {deposit.receiptUrl ? (
                      <a
                        href={`${import.meta.env.VITE_API_URL || "https://grow-0nfm.onrender.com"}${deposit.receiptUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL || "https://grow-0nfm.onrender.com"}${deposit.receiptUrl}`}
                          alt="Receipt"
                          style={{ width: "100px", borderRadius: "6px" }}
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
    </AdminLayout>
  );
};

export default AdminDeposits;
