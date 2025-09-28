import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ should be the same one saved at login
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBan = async (userId, isBanned) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `/admin/users/${userId}/ban`,
        { ban: !isBanned },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Toggle ban error:", err);
      setError("Failed to update user status.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-users-container">
      <h1>Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Investment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>₦{user.investmentAmount || 0}</td>
                <td>{user.isBanned ? "Banned" : "Active"}</td>
                <td>
                  <button
                    onClick={() => toggleBan(user._id, user.isBanned)}
                    className={user.isBanned ? "unban-btn" : "ban-btn"}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
