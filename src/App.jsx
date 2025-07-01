import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RecurringBusiness from './pages/RecurringBusiness';
import Referral from './pages/Referral';
import Withdrawal from './pages/Withdrawal';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recurring" element={<RecurringBusiness />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
