// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Investments", path: "/investments" },
    { name: "Deposits", path: "/deposits" },
    { name: "Withdrawals", path: "/withdrawals" },
    { name: "Referrals", path: "/referrals" },
    { name: "Account", path: "/account" },
  ];

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4 shadow">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `p-2 rounded hover:bg-green-200 ${
                isActive ? "bg-green-400 text-white font-bold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
