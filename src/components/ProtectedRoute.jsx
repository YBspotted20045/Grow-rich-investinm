// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  // If route requires admin
  if (adminOnly) {
    if (!adminToken || !adminInfo) {
      return <Navigate to="/login" replace />;
    }
  } else {
    // If normal user route
    if (!token || !userInfo) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
