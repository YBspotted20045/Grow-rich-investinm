// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ReferralDashboard from "./Pages/ReferralDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("gr_token"));
  const location = useLocation();

  // Whenever localStorage changes, update token state
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("gr_token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/referrals"
        element={token ? <ReferralDashboard /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
