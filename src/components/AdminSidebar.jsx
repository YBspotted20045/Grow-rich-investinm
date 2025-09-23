import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaMoneyBill, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Users", path: "/admin/users", icon: <FaUser /> },
    { name: "Deposits", path: "/admin/deposits", icon: <FaMoneyBill /> },
    { name: "Withdrawals", path: "/admin/withdrawals", icon: <FaMoneyBill /> },
    { name: "Investments", path: "/admin/investments", icon: <FaChartBar /> },
    { name: "Referrals", path: "/admin/referrals", icon: <FaUsers /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
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
            to="/admin/logout"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
