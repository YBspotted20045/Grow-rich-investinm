// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("gr_token");
  const user = JSON.parse(localStorage.getItem("gr_user") || "{}");

  if (!token) {
    // not logged in → redirect
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    // logged in but not admin → redirect to user dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
