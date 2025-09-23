import React, { useEffect, useState } from "react";
import API from "../axios.js";

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await API.get("/admin/deposits", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDeposits(res.data.deposits);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch deposits.");
      }
    };
    fetchDeposits();
  }, []);

  const handleApproveReject = async (depositId, action) => {
    try {
      await API.put(
        `/admin/deposits/${depositId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDeposits((prev) =>
        prev.map((d) => (d._id === depositId ? { ...d, status: action === "approve" ? "approved" : "rejected" } : d))
      );
    } catch (err) {
      console.error(err);
      setMessage("Action failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Deposit Management</h1>
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
          {deposits.map((deposit) => (
            <tr key={deposit._id} className="text-center">
              <td className="border p-2">{deposit.user.username}</td>
              <td className="border p-2">₦{deposit.amount}</td>
              <td className="border p-2">{deposit.status}</td>
              <td className="border p-2">
                {deposit.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApproveReject(deposit._id, "approve")}
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproveReject(deposit._id, "reject")}
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

export default AdminDeposits;
