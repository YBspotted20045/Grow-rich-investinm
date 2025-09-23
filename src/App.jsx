// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Admin pages (inside admin folder)
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminDeposits from "./pages/admin/AdminDeposits.jsx";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/deposits" element={<AdminDeposits />} />
        <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
      </Routes>
    </Router>
  );
}

export default App;
