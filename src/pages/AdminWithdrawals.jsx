import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Header from "../components/Header.jsx";
import Table from "../components/Table.jsx";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("/withdrawals/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch withdrawals");
    }
  };

  const updateStatus = async (withdrawalId, status) => {
    try {
      await axios.put(
        `/withdrawals/${withdrawalId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWithdrawals();
    } catch (err) {
      console.error(err);
      setMessage("Action failed");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Manage Withdrawals</h1>
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <Table
          data={withdrawals}
          columns={[
            { header: "User", accessor: "userId.email" },
            { header: "Amount", accessor: "amount" },
            { header: "Status", accessor: "status" },
            { header: "Actions", accessor: "actions" },
          ]}
          renderRow={(w) => (
            <tr key={w._id}>
              <td>{w.userId?.email}</td>
              <td>₦{w.amount}</td>
              <td>{w.status}</td>
              <td className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-600 text-white rounded"
                  onClick={() => updateStatus(w._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => updateStatus(w._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AdminWithdrawals;
