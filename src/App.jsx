// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";

// PAGES (I’ll send the rest next)
import Landing from "./pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import InvestmentForm from "./Pages/InvestmentForm";
import ReferralDashboard from "./Pages/ReferralDashboard";

// These will arrive in the next message:
const Deposit = React.lazy(() => import("./Pages/Deposit"));      // new
const Withdraw = React.lazy(() => import("./Pages/Withdraw"));    // new
const Account = React.lazy(() => import("./Pages/Account"));      // new
const Vendors = React.lazy(() => import("./Pages/Vendors"));      // new

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
            path="/withdraw"
            element={
              <RequireAuth>
                <React.Suspense fallback={<div className="sub">Loading…</div>}>
                  <Withdraw />
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* the “bar” that connects everything */}
      <BottomNav />
    </BrowserRouter>
  );
}
