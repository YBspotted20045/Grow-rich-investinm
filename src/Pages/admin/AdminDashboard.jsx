// src/Pages/admin/AdminDashboard.jsx
import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-green-600">GrowRich Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full p-2 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full p-2 rounded-lg ${
              activeTab === "users"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <UsersIcon className="h-5 w-5 mr-3" />
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab("deposits")}
            className={`flex items-center w-full p-2 rounded-lg ${
              activeTab === "deposits"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <CreditCardIcon className="h-5 w-5 mr-3" />
            Manage Deposits
          </button>
          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`flex items-center w-full p-2 rounded-lg ${
              activeTab === "withdrawals"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BanknotesIcon className="h-5 w-5 mr-3" />
            Withdrawals
          </button>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded-lg">
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Total Users</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Total Deposits</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Pending Deposits</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Withdrawals</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <p>List of all users will appear here.</p>
          </div>
        )}

        {activeTab === "deposits" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Deposits</h2>
            <p>Deposit receipts will appear here.</p>
          </div>
        )}

        {activeTab === "withdrawals" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Withdrawals</h2>
            <p>Withdrawal requests will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
