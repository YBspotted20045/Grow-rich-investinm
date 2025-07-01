import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'; // Make sure your logo file is named exactly logo.png and in src/assets

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Grow Rich Investments Logo" className="h-10 w-10 rounded-full" />
        <h1 className="text-xl font-bold text-purple-800">Grow Rich Investments</h1>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-purple-700 hover:text-purple-900 font-medium">Home</Link>
        <Link to="/login" className="text-purple-700 hover:text-purple-900 font-medium">Login</Link>
        <Link to="/register" className="text-purple-700 hover:text-purple-900 font-medium">Register</Link>
        <Link to="/dashboard" className="text-purple-700 hover:text-purple-900 font-medium">Dashboard</Link>
        <Link to="/referral" className="text-purple-700 hover:text-purple-900 font-medium">Referral</Link>
        <Link to="/withdraw" className="text-purple-700 hover:text-purple-900 font-medium">Withdraw</Link>
      </div>
    </nav>
  );
};

export default Navbar;
