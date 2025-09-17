import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageDeposits() {
  const [deposits, setDeposits] = useState([]);

  const fetchDeposits = async () => {
    try {
      const res = await API.get("/admin/deposits", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setDeposits(res.data);
    } catch (err) {
      console.error("Failed to fetch deposits", err);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await API.patch(
        `/admin/deposits/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      fetchDeposits();
    } catch (err) {
      console.error("Failed to update deposit", err);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Deposits</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Receipt</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((d) => (
            <tr key={d._id} className="border-t">
              <td className="p-2">{d.userId?.email}</td>
              <td className="p-2">₦{d.amount}</td>
              <td className="p-2">{d.status}</td>
              <td className="p-2">
                <a
                  href={d.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </td>
              <td className="p-2">
                {d.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(d._id, "approve")}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(d._id, "reject")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
              }
