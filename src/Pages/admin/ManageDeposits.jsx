// src/Pages/admin/ManageDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setDeposits(res.data || []);
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setMessage("Failed to load deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await API.put(
        `/admin/deposits/${id}`,
        { action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );

      setMessage(res.data.message || "Action completed");
      fetchDeposits(); // refresh list
    } catch (err) {
      console.error("Error updating deposit:", err);
      setMessage(err.response?.data?.message || "Failed to update deposit");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Deposits</h2>
      {message && <div className="mb-3 text-sm text-blue-600">{message}</div>}
      {loading ? (
        <p>Loading deposits...</p>
      ) : deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">User</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Receipt</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((d) => (
              <tr key={d._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {d.userId?.email || "Unknown"} <br />
                  <small className="text-gray-500">{d.userId?._id}</small>
                </td>
                <td className="p-3">₦{d.amount.toLocaleString()}</td>
                <td className="p-3">
                  {d.receiptUrl ? (
                    <a
                      href={d.receiptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Receipt
                    </a>
                  ) : (
                    "No receipt"
                  )}
                </td>
                <td className="p-3 capitalize">{d.status}</td>
                <td className="p-3 flex gap-2">
                  {d.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(d._id, "approve")}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(d._id, "reject")}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
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
