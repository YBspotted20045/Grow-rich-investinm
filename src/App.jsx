import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ── User Pages ───────────────────────────────
import Layout from "./Pages/Layout.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Deposit from "./Pages/Deposit.jsx";
import Vendors from "./Pages/Vendors.jsx";
import Withdrawal from "./Pages/Withdrawal.jsx";
import Account from "./Pages/Account.jsx";
import ReferralDashboard from "./Pages/ReferralDashboard.jsx";

// ── Admin Pages ──────────────────────────────
import AdminLogin from "./Pages/AdminLogin.jsx"; // ✅ NEW PAGE
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import DashboardHome from "./Pages/admin/DashboardHome.jsx";
import ManageUsers from "./Pages/admin/ManageUsers.jsx";
import ManageDeposits from "./Pages/admin/ManageDeposits.jsx";

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const token = localStorage.getItem("gr_token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return token && isAdmin ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Default: if logged in → dashboard, otherwise → signup */}
      <Route
        path="/"
        element={
          localStorage.getItem("gr_token") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Signup />
          )
        }
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ── Protected User Layout ── */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="account" element={<Account />} />
        <Route path="referrals" element={<ReferralDashboard />} />
      </Route>

      {/* ── Admin Login ── */}
      <Route path="/admin-login" element={<AdminLogin />} /> {/* ✅ NEW */}

      {/* ── Admin Layout ── */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="deposits" element={<ManageDeposits />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
