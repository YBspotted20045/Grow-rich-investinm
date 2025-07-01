import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Grow Rich Investments</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/recurring" className="hover:text-gray-300">Recurring</Link>
          <Link to="/referral" className="hover:text-gray-300">Referral</Link>
          <Link to="/withdrawal" className="hover:text-gray-300">Withdraw</Link>
          <Link to="/" className="hover:text-gray-300">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
