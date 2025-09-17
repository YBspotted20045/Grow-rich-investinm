// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">GrowRich Admin</h2>
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 rounded hover:bg-green-600"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="block px-4 py-2 rounded hover:bg-green-600"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/deposits"
            className="block px-4 py-2 rounded hover:bg-green-600"
          >
            Manage Deposits
          </Link>
          <Link
            to="/admin/withdrawals"
            className="block px-4 py-2 rounded hover:bg-green-600"
          >
            Manage Withdrawals
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-6"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* child routes will render here */}
      </main>
    </div>
  );
        }
