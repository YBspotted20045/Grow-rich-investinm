// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Deposit from "./Pages/Deposit.jsx";
import Withdrawal from "./Pages/Withdrawal.jsx";
import Account from "./Pages/Account.jsx";
import ReferralDashboard from "./Pages/ReferralDashboard.jsx";

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
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

      {/* Protected layout */}
      <Route
        path="/"
        element={<RequireAuth><Layout /></RequireAuth>}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="account" element={<Account />} />
        <Route path="referrals" element={<ReferralDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
