import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// LAYOUT
import Layout from "./Pages/Layout.jsx";

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
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

        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />

        {/* Protected Routes with Layout */}
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

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
