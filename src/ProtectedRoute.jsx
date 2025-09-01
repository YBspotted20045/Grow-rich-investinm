// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("gr_token"); // check token
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
