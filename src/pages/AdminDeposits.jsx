import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import "./AdminDeposits.css";

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeposits(res.data);
    } catch (err) {
      console.error("Fetch deposits error:", err);
    }
  };

  const handleAction = async (depositId, action) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `/admin/deposits/${depositId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits(); // Refresh list
    } catch (err) {
      console.error("Deposit action error:", err);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <div className="admin-deposits-container">
      <h1>Manage Deposits</h1>
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
              <td>{deposit.userFullName}</td>
              <td>₦{deposit.amount}</td>
              <td>
                {deposit.receipt ? (
                  <a href={deposit.receipt} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : (
                  "No receipt"
                )}
              </td>
              <td>{deposit.status}</td>
              <td>
                <button
                  onClick={() => handleAction(deposit._id, "approved")}
                  className="approve-btn"
                  disabled={deposit.status === "approved"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(deposit._id, "rejected")}
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
    </div>
  );
};

export default AdminDeposits;
