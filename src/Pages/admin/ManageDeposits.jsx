// frontend/src/Pages/admin/ManageDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/deposits/admin"); // ✅ backend endpoint
        setDeposits(data);
      } catch (err) {
        console.error("Failed to load deposits:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading deposits...</p>;

  return (
    <div>
      <h2>📥 Manage Deposits</h2>
      {deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((dep) => (
              <tr key={dep._id}>
                <td>{dep.user?.email}</td>
                <td>₦{dep.amount}</td>
                <td>{dep.status}</td>
                <td>
                  {dep.receipt ? (
                    <a
                      href={`https://grow-0nfm.onrender.com/${dep.receipt}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Receipt
                    </a>
                  ) : (
                    "No receipt"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
