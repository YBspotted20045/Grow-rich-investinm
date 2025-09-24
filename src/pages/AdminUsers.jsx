import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const toggleBan = async (userId, isBanned) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `/admin/users/${userId}/ban`,
        { ban: !isBanned },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Toggle ban error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-container">
      <h1>Manage Users</h1>
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
    </div>
  );
};

export default AdminUsers;
