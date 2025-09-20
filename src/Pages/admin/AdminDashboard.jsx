// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CreditCard,
  Hourglass,
  DollarSign,
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-600">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600 transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600 transition"
          >
            <Users size={20} /> Manage Users
          </Link>
          <Link
            to="/admin/deposits"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600 transition"
          >
            <CreditCard size={20} /> Manage Deposits
          </Link>
          <Link
            to="/admin/withdrawals"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-600 transition"
          >
            <DollarSign size={20} /> Manage Withdrawals
          </Link>
        </nav>
        <div className="p-4 border-t border-green-600">
          <button className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-red-600 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <Users className="text-green-600" size={32} />
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <CreditCard className="text-green-600" size={32} />
            <div>
              <p className="text-gray-500 text-sm">Total Deposits</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <Hourglass className="text-yellow-500" size={32} />
            <div>
              <p className="text-gray-500 text-sm">Pending Deposits</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
            <DollarSign className="text-blue-600" size={32} />
            <div>
              <p className="text-gray-500 text-sm">Withdrawals</p>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
