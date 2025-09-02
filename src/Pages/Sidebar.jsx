// src/pages/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Invest", path: "/invest" },
    { name: "Deposit", path: "/deposit" },
    { name: "Withdrawal", path: "/withdrawal" },
    { name: "Accounts", path: "/accounts" },
    { name: "Referrals", path: "/referrals" },
    { name: "Vendors", path: "/vendors" },
  ];

  return (
    <div className="h-screen w-64 bg-black text-yellow-400 flex flex-col shadow-lg">
      {/* Logo / Brand */}
      <div className="p-6 text-2xl font-bold border-b border-yellow-600">
        GrowRich
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 text-lg font-medium transition ${
              location.pathname === item.path
                ? "bg-yellow-600 text-black rounded-l-xl"
                : "hover:bg-yellow-700 hover:text-black"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm text-center border-t border-yellow-600">
        © 2025 GrowRich
      </div>
    </div>
  );
        }
