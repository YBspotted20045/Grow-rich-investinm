// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // user object from login
  const adminToken = localStorage.getItem("adminToken"); // separate admin token

  // If no user at all → redirect to login
  if (!userInfo && !adminToken) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Handle admin-only pages
  if (adminOnly) {
    // If no admin token, block access
    if (!adminToken) {
      return <Navigate to="/dashboard" replace />;
    }
  } else {
    // ✅ Normal user pages: if this is an admin login, redirect to admin dashboard
    if (adminToken) {
      return <Navigate to="/admin-dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
