// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-green-600 text-white shadow">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        GrowRich Investments
      </h1>
      <div className="flex items-center gap-4">
        <span>{user?.username || "Guest"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
