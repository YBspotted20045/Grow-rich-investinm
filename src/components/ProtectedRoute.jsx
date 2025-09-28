// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If no token or user, block access
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin but user is not admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If route requires normal user but logged in is admin
  if (!adminOnly && user.isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
