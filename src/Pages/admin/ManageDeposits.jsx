// src/Pages/admin/ManageDeposits.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all deposits (admin)
  const fetchDeposits = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setDeposits(data);
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setError("Failed to load deposits");
    } finally {
      setLoading(false);
    }
  };

  // Approve deposit
  const approveDeposit = async (id) => {
    try {
      const res = await API.put(
        `/admin/deposits/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      setMessage(res.data.message || "Deposit approved");
      fetchDeposits();
    } catch (err) {
      console.error("Error approving deposit:", err);
      setMessage(err.response?.data?.message || "Failed to approve deposit");
    }
  };

  // Reject deposit
  const rejectDeposit = async (id) => {
    try {
      const res = await API.put(
        `/admin/deposits/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      setMessage(res.data.message || "Deposit rejected");
      fetchDeposits();
    } catch (err) {
      console.error("Error rejecting deposit:", err);
      setMessage(err.response?.data?.message || "Failed to reject deposit");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) return <p>Loading deposits...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Manage Deposits</h2>

      {message && (
        <div className="mb-3 text-sm text-blue-600">{message}</div>
      )}

      {deposits.length === 0 ? (
        <p>No deposits found</p>
      ) : (
        <table className="min-w-[600px] w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Amount</th>
              <th className="border p-2 text-left">Receipt</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((dep) => (
              <tr key={dep._id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {dep.userId?.username || dep.userId?.email}
                </td>
                <td className="border p-2">₦{dep.amount}</td>
                <td className="border p-2">
                  {dep.receipt ? (
                    <a
                      href={dep.receipt.startsWith("http") ? dep.receipt : `${API.defaults.baseURL}/${dep.receipt}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Receipt
                    </a>
                  ) : (
                    "No receipt"
                  )}
                </td>
                <td className="border p-2">{dep.status}</td>
                <td className="border p-2 flex flex-col sm:flex-row gap-2">
                  {dep.status !== "approved" && (
                    <button
                      onClick={() => approveDeposit(dep._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  )}
                  {dep.status !== "rejected" && (
                    <button
                      onClick={() => rejectDeposit(dep._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
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
