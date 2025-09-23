import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import AdminSidebar from "../components/AdminSidebar.jsx";
import Header from "../components/Header.jsx";
import Table from "../components/Table.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    }
  };

  const handleBanToggle = async (userId, isBanned) => {
    try {
      await axios.put(
        `/admin/users/${userId}/ban`,
        { isBanned: !isBanned },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage("Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <Table
          data={users}
          columns={[
            { header: "Username", accessor: "username" },
            { header: "Email", accessor: "email" },
            { header: "Investment", accessor: "investmentAmount" },
            { header: "Actions", accessor: "actions" },
          ]}
          renderRow={(user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>₦{user.investmentAmount}</td>
              <td>
                <button
                  onClick={() => handleBanToggle(user._id, user.isBanned)}
                  className={`px-2 py-1 rounded ${
                    user.isBanned ? "bg-green-600" : "bg-red-600"
                  } text-white`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
