// src/index.jsx  
import React from "react";  
import ReactDOM from "react-dom/client";  
import { BrowserRouter, Routes, Route } from "react-router-dom";  

import Home from "./pages/Home.jsx";  
import Signup from "./pages/Signup.jsx";  
import Login from "./pages/Login.jsx";  
import Dashboard from "./pages/Dashboard.jsx";  
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // 👈 added this  

const root = ReactDOM.createRoot(document.getElementById("root"));  

root.render(  
  <BrowserRouter>  
    <Routes>  
      {/* Public routes */}  
      <Route path="/" element={<Home />} />  
      <Route path="/login" element={<Login />} />  
      <Route path="/signup" element={<Signup />} />  

      {/* Protected route for dashboard */}  
      <Route  
        path="/dashboard"  
        element={  
          <ProtectedRoute>  
            <Dashboard />  
          </ProtectedRoute>  
        }  
      />  
    </Routes>  
  </BrowserRouter>  
);
