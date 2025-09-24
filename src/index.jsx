import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx"; // first page to render
import AdminLogin from "./pages/AdminLogin.jsx"; // optional: for admin login

// You can import CSS for pages here if needed, e.g.
// import "./pages-css/Home.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Render your initial page */}
    <Home />
  </React.StrictMode>
);
