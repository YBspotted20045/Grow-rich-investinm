// src/layouts/Layout.jsx
import Sidebar from "../pages/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
}
