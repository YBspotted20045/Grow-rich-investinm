// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import Landing from "./Pages/Landing.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import InvestmentForm from "./Pages/InvestmentForm.jsx";
import ReferralDashboard from "./Pages/ReferralDashboard.jsx";
import Deposit from "./Pages/Deposit.jsx";
import Withdrawal from "./Pages/Withdrawal.jsx";
import Account from "./Pages/Account.jsx";
import Vendors from "./Pages/Vendors.jsx";

// LAYOUT (kept in components folder)
import Layout from "./Pages/Layout.jsx";

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          localStorage.getItem("gr_token")
            ? <Navigate to="/dashboard" replace />
            : <Signup />
        }
      />

      {/* Public */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/landing" element={<Landing />} />

      {/* Protected (inside Layout) */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invest" element={<InvestmentForm />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="account" element={<Account />} />
        <Route path="referrals" element={<ReferralDashboard />} />
        <Route path="vendors" element={<Vendors />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
        }
