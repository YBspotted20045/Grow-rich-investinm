import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="h-16 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 text-black flex items-center justify-between px-6 shadow-lg">
          <h1 className="text-xl font-bold tracking-wide">GrowRich Investments</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, User</span>
            <img
              src="https://ui-avatars.com/api/?name=User&background=FFD700&color=000"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-yellow-500"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-black via-gray-900 to-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
