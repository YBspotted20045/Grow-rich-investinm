// src/Pages/admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import API from "../../axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleBan = async (id, action) => {
    try {
      const res = await API.put(
        `/admin/users/${id}`,
        { action },
        { headers: { Authorization: `Bearer ${localStorage.getItem("gr_token")}` } }
      );
      setMessage(res.data.message || "Action completed");
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage(err.response?.data?.message || "Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {message && <div className="mb-3 text-sm text-blue-600">{message}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.username || u.name || "No Name"}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.isBanned ? "Banned" : "Active"}</td>
                <td className="p-3 flex gap-2">
                  {u.isBanned ? (
                    <button
                      onClick={() => toggleBan(u._id, "unban")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Unban
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleBan(u._id, "ban")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Ban
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
