// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";

// PAGES
import Landing from "./Pages/Landing.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import InvestmentForm from "./Pages/InvestmentForm.jsx";
import ReferralDashboard from "./Pages/ReferralDashboard";

// Lazy-loaded pages
const Deposit = React.lazy(() => import("./Pages/Deposit"));
const Withdrawal = React.lazy(() => import("./Pages/Withdrawal")); // ✅ fixed
const Account = React.lazy(() => import("./Pages/Account"));
const Vendors = React.lazy(() => import("./Pages/Vendors"));

function RequireAuth({ children }) {
  const token = localStorage.getItem("gr_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container" style={{ paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/invest"
            element={
              <RequireAuth>
                <InvestmentForm />
              </RequireAuth>
            }
          />

          <Route
            path="/referrals"
            element={
              <RequireAuth>
                <ReferralDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/deposit"
            element={
              <RequireAuth>
                <React.Suspense fallback={<div className="sub">Loading…</div>}>
                  <Deposit />
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/withdrawal" // ✅ changed path to match component name
            element={
              <RequireAuth>
                <React.Suspense fallback={<div className="sub">Loading…</div>}>
                  <Withdrawal /> {/* ✅ fixed */}
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/account"
            element={
              <RequireAuth>
                <React.Suspense fallback={<div className="sub">Loading…</div>}>
                  <Account />
                </React.Suspense>
              </RequireAuth>
            }
          />

          <Route
            path="/vendors"
            element={
              <RequireAuth>
                <React.Suspense fallback={<div className="sub">Loading…</div>}>
                  <Vendors />
                </React.Suspense>
              </RequireAuth>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* bottom navigation bar */}
      <BottomNav />
    </BrowserRouter>
  );
}
