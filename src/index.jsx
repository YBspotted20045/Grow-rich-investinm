import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";  // adjust if default export
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
