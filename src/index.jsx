// src/index.jsx  
import React from "react";  
import ReactDOM from "react-dom/client";  
import { BrowserRouter, Routes, Route } from "react-router-dom";  

import Home from "./pages/Home.jsx";  
import Signup from "./pages/Signup.jsx";  
import Login from "./pages/Login.jsx";  
import Dashboard from "./pages/Dashboard.jsx"; // 👈 make sure this file exists  

const root = ReactDOM.createRoot(document.getElementById("root"));  

root.render(  
  <BrowserRouter>  
    <Routes>  
      <Route path="/" element={<Home />} />  
      <Route path="/login" element={<Login />} />  
      <Route path="/signup" element={<Signup />} />  
      <Route path="/Dashboard" element={<Dashboard />} /> {/* 👈 added route */}  
    </Routes>  
  </BrowserRouter>  
);
