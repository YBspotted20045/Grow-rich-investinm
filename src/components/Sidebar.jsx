import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaMoneyBill, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Users", path: "/users", icon: <FaUser /> },
    { name: "Deposits", path: "/deposits", icon: <FaMoneyBill /> },
    { name: "Withdrawals", path: "/withdrawals", icon: <FaMoneyBill /> },
    { name: "Investments", path: "/investments", icon: <FaChartBar /> },
    { name: "Referrals", path: "/referrals", icon: <FaUsers /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">GrowRich Admin</h2>
      <ul className="flex flex-col gap-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/logout"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
