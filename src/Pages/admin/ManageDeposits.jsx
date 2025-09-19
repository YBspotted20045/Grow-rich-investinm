// src/Pages/admin/ManageDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch deposits from backend
  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setDeposits(res.data || []);
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setMessage("❌ Failed to load deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await API.post(
        `/admin/deposits/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );

      setMessage(`✅ ${res.data.message || "Action successful"}`);
      // Refresh deposits after action
      fetchDeposits();
    } catch (err) {
      console.error(`Error on ${action}:`, err);
      setMessage(`❌ Failed to ${action} deposit`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Deposits</h2>

      {message && <div className="mb-3 text-sm text-blue-600">{message}</div>}

      {loading ? (
        <p>Loading deposits...</p>
      ) : deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-sm rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Receipt</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit._id}>
                  <td className="border px-4 py-2">
                    {deposit.user?.email || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">₦{deposit.amount}</td>
                  <td className="border px-4 py-2">
                    {new Date(deposit.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {deposit.receiptUrl ? (
                      <a
                        href={deposit.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Receipt
                      </a>
                    ) : (
                      "No receipt"
                    )}
                  </td>
                  <td className="border px-4 py-2">{deposit.status}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    {deposit.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(deposit._id, "approve")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(deposit._id, "reject")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {deposit.status !== "pending" && (
                      <span className="text-gray-500 italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageDeposits;
