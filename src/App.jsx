// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ReferralDashboard from "./Pages/ReferralDashboard";

function App() {
  const token = localStorage.getItem("gr_token");

  return (
    <Routes>
      {/* Default Route - goes to Signup if no token, Dashboard if logged in */}
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Signup />}
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/referrals"
        element={token ? <ReferralDashboard /> : <Navigate to="/login" />}
      />

      {/* Fallback - anything else goes to Signup */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
