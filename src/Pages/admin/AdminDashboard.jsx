import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gr_token");
    localStorage.removeItem("gr_user");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login"); // ✅ send admin back to AdminLogin
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-green-600">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/dashboard"
            className="px-3 py-2 rounded hover:bg-green-100"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="px-3 py-2 rounded hover:bg-green-100"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/deposits"
            className="px-3 py-2 rounded hover:bg-green-100"
          >
            Manage Deposits
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
