import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyCheckAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminDashboard.css"; // we'll add CSS next

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("gr_token");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "←" : "→"}
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <FaTachometerAlt /> {isOpen && "Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <FaUsers /> {isOpen && "Manage Users"}
              </Link>
            </li>
            <li>
              <Link to="/admin/deposits">
                <FaMoneyCheckAlt /> {isOpen && "Manage Deposits"}
              </Link>
            </li>
            <li>
              <button className="logout" onClick={handleLogout}>
                <FaSignOutAlt /> {isOpen && "Logout"}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
