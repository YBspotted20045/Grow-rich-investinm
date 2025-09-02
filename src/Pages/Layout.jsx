// src/Pages/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css"; // still fine for extra styling if you want

export default function Layout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } md:block w-64 bg-[#FFD700] text-black p-6 fixed md:relative z-20`}
      >
        <h2 className="text-2xl font-bold mb-8">GrowRich</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="block font-medium hover:text-white">
            Dashboard
          </Link>
          <Link to="/invest" className="block font-medium hover:text-white">
            Invest
          </Link>
          <Link to="/deposit" className="block font-medium hover:text-white">
            Deposit
          </Link>
          <Link to="/withdrawal" className="block font-medium hover:text-white">
            Withdrawal
          </Link>
          <Link to="/account" className="block font-medium hover:text-white">
            Account
          </Link>
          <Link to="/vendors" className="block font-medium hover:text-white">
            Vendors
          </Link>
          <Link to="/referrals" className="block font-medium hover:text-white">
            Referrals
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 bg-black text-[#FFD700] px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Logout
        </button>
      </aside>

      {/* main content area */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* topbar */}
        <header className="bg-white shadow px-4 py-3 flex items-center md:hidden">
          <button
            className="text-2xl mr-4"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          <h2 className="font-bold text-lg">GrowRich</h2>
        </header>

        {/* page content */}
        <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
