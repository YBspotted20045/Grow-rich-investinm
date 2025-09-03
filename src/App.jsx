import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// PAGES
import Landing from "./Pages/Landing.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ReferralDashboard from "./Pages/ReferralDashboard.jsx";
import Layout from "./Pages/Layout.jsx";

// Lazy-loaded
const Deposit = React.lazy(() => import("./Pages/Deposit.jsx"));
const Withdrawal = React.lazy(() => import("./Pages/Withdrawal.jsx"));
const Account = React.lazy(() => import("./Pages/Account.jsx"));
const Vendors = React.lazy(() => import("./Pages/Vendors.jsx"));

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="container" style={{ paddingBottom: 80 }}>
      <Routes>
        {/* Default route */}
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

        {/* Public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="referrals" element={<ReferralDashboard />} />

          <Route
            path="deposit"
            element={
              <React.Suspense fallback={<div className="sub">Loading…</div>}>
                <Deposit />
              </React.Suspense>
            }
          />

          <Route
            path="withdrawal"
            element={
              <React.Suspense fallback={<div className="sub">Loading…</div>}>
                <Withdrawal />
              </React.Suspense>
            }
          />

          <Route
            path="account"
            element={
              <React.Suspense fallback={<div className="sub">Loading…</div>}>
                <Account />
              </React.Suspense>
            }
          />

          <Route
            path="vendors"
            element={
              <React.Suspense fallback={<div className="sub">Loading…</div>}>
                <Vendors />
              </React.Suspense>
            }
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
              }
