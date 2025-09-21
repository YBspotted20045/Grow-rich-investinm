import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeposits = async () => {
    try {
      const { data } = await API.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setDeposits(data);
    } catch (err) {
      console.error("Fetch deposits error:", err);
      setError("Failed to load deposits");
    } finally {
      setLoading(false);
    }
  };

  const approveDeposit = async (id) => {
    try {
      await API.put(
        `/admin/deposits/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error("Approve error:", err);
      alert("Failed to approve deposit");
    }
  };

  const rejectDeposit = async (id) => {
    try {
      await API.put(
        `/admin/deposits/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error("Reject error:", err);
      alert("Failed to reject deposit");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) return <p>Loading deposits...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Deposits</h2>

      {deposits.length === 0 ? (
        <p>No deposits found</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Receipt</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((dep) => (
              <tr key={dep._id}>
                <td className="border p-2">
                  {dep.userId?.username || dep.userId?.email}
                </td>
                <td className="border p-2">₦{dep.amount}</td>
                <td className="border p-2">
                  {dep.receiptUrl ? (
                    <a
                      href={dep.receiptUrl}
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
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => approveDeposit(dep._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectDeposit(dep._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
                }
