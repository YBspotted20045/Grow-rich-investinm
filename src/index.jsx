// src/index.jsx  
import React from "react";  
import ReactDOM from "react-dom/client";  
import { BrowserRouter, Routes, Route } from "react-router-dom";  

import Home from "./pages/Home.jsx";  
import Signup from "./pages/Signup.jsx";  
import Login from "./pages/Login.jsx";  
import Dashboard from "./pages/Dashboard.jsx";  
import Deposit from "./pages/Deposit.jsx";   // 👈 added this
import ProtectedRoute from "./components/ProtectedRoute.jsx";  

const root = ReactDOM.createRoot(document.getElementById("root"));  

root.render(  
  <BrowserRouter>  
    <Routes>  
      {/* Public routes */}  
      <Route path="/" element={<Home />} />  
      <Route path="/login" element={<Login />} />  
      <Route path="/signup" element={<Signup />} />  

      {/* Protected routes */}  
      <Route  
        path="/dashboard"  
        element={  
          <ProtectedRoute>  
            <Dashboard />  
          </ProtectedRoute>  
        }  
      />  

      <Route  
        path="/deposit"  
        element={  
          <ProtectedRoute>  
            <Deposit />  
          </ProtectedRoute>  
        }  
      />  
    </Routes>  
  </BrowserRouter>  
);
