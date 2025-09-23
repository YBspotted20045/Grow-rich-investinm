import React, { useEffect, useState } from "react";
import API from "../axios.js";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleBanUnban = async (userId, action) => {
    try {
      await API.put(
        `/admin/users/${userId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status: action === "ban" ? "banned" : "active" } : u))
      );
    } catch (err) {
      console.error(err);
      setMessage("Action failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                {user.status === "active" ? (
                  <button onClick={() => handleBanUnban(user._id, "ban")} className="px-2 py-1 bg-red-500 text-white rounded">
                    Ban
                  </button>
                ) : (
                  <button onClick={() => handleBanUnban(user._id, "unban")} className="px-2 py-1 bg-green-500 text-white rounded">
                    Unban
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
