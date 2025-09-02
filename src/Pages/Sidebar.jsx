// src/Pages/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-[#FFD700] text-black p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">GrowRich</h1>
      <nav className="flex-1 space-y-4">
        <Link to="/dashboard" className="block font-medium hover:text-white">
          Dashboard
        </Link>
        <Link to="/investments" className="block font-medium hover:text-white">
          Investments
        </Link>
        <Link to="/referrals" className="block font-medium hover:text-white">
          Referrals
        </Link>
        <Link to="/account" className="block font-medium hover:text-white">
          Account
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-black text-[#FFD700] px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
