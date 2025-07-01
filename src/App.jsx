// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<h2>404 | Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
