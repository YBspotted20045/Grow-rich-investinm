import React, { useEffect, useState } from "react";
import API from "../axios.js";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await API.get("/admin/withdrawals", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWithdrawals(res.data.withdrawals);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch withdrawals.");
      }
    };
    fetchWithdrawals();
  }, []);

  const handleApproveReject = async (withdrawalId, action) => {
    try {
      await API.put(
        `/admin/withdrawals/${withdrawalId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWithdrawals((prev) =>
        prev.map((w) =>
          w._id === withdrawalId ? { ...w, status: action === "approve" ? "approved" : "rejected" } : w
        )
      );
    } catch (err) {
      console.error(err);
      setMessage("Action failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Withdrawal Management</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w) => (
            <tr key={w._id} className="text-center">
              <td className="border p-2">{w.user.username}</td>
              <td className="border p-2">₦{w.amount}</td>
              <td className="border p-2">{w.status}</td>
              <td className="border p-2">
                {w.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApproveReject(w._id, "approve")}
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproveReject(w._id, "reject")}
                      className="px-2 py-1 bg-red-500 text-white rounded"
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
    </div>
  );
};

export default AdminWithdrawals;
