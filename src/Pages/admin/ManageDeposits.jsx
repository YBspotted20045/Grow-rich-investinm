// frontend/src/Pages/admin/ManageDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      const { data } = await API.get("/deposits/all");
      setDeposits(data);
    } catch (err) {
      console.error("Failed to load deposits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await API.put(`/deposits/${id}/${action}`);
      fetchDeposits(); // refresh list
    } catch (err) {
      console.error(`Failed to ${action} deposit:`, err);
    }
  };

  if (loading) return <p>Loading deposits...</p>;

  return (
    <div>
      <h2>📥 Manage Deposits</h2>
      {deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((dep) => (
              <tr key={dep._id}>
                <td>{dep.userId?.email}</td>
                <td>₦{dep.amount}</td>
                <td>{dep.status}</td>
                <td>
                  {dep.receiptUrl ? (
                    <a
                      href={`https://grow-0nfm.onrender.com/${dep.receiptUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Receipt
                    </a>
                  ) : (
                    "No receipt"
                  )}
                </td>
                <td>
                  {dep.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(dep._id, "approve")}
                        style={{ marginRight: "8px", background: "green", color: "white" }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(dep._id, "reject")}
                        style={{ background: "red", color: "white" }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {dep.status !== "pending" && <em>✔ {dep.status}</em>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
