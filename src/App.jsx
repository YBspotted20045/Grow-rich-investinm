// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ReferralDashboard from "./Pages/ReferralDashboard";

function App() {
  const token = localStorage.getItem("gr_token");

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/signup" replace />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/referrals"
          element={token ? <ReferralDashboard /> : <Navigate to="/login" replace />}
        />

        {/* Fallback - redirect to signup */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
