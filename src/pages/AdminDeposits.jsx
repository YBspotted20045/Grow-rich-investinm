import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Header from "../components/Header.jsx";
import Table from "../components/Table.jsx";

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchDeposits = async () => {
    try {
      const res = await axios.get("/deposits/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeposits(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch deposits");
    }
  };

  const updateStatus = async (depositId, status) => {
    try {
      await axios.put(
        `/deposits/${depositId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error(err);
      setMessage("Action failed");
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Manage Deposits</h1>
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <Table
          data={deposits}
          columns={[
            { header: "User", accessor: "userId.email" },
            { header: "Amount", accessor: "amount" },
            { header: "Status", accessor: "status" },
            { header: "Receipt", accessor: "receiptUrl" },
            { header: "Actions", accessor: "actions" },
          ]}
          renderRow={(dep) => (
            <tr key={dep._id}>
              <td>{dep.userId?.email}</td>
              <td>₦{dep.amount}</td>
              <td>{dep.status}</td>
              <td>
                {dep.receiptUrl && (
                  <a
                    href={dep.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                )}
              </td>
              <td className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-600 text-white rounded"
                  onClick={() => updateStatus(dep._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => updateStatus(dep._id, "rejected")}
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

export default AdminDeposits;
