import React, { useEffect, useState } from "react";
import API from "./axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      // ✅ Fetch users with deposits info
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // Compute total approved deposits per user (if backend doesn’t already do this)
        const processed = res.data.users.map((user) => {
          const totalDeposited = Array.isArray(user.deposits)
            ? user.deposits
                .filter((d) => d.status === "approved")
                .reduce((sum, d) => sum + d.amount, 0)
            : 0;
          return { ...user, totalDeposited };
        });

        setUsers(processed);
      } else {
        setError("Failed to load users.");
      }
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

      await API.put(
        `/admin/users/${userId}/ban`,
        { ban: !isBanned },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers(); // refresh after update
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

      {Array.isArray(users) && users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Total Approved Deposits</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fullName || "N/A"}</td>
                <td>{user.email}</td>
                <td>₦{user.totalDeposited.toLocaleString()}</td>
                <td
                  style={{
                    color: user.isBanned ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {user.isBanned ? "Banned" : "Active"}
                </td>
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
