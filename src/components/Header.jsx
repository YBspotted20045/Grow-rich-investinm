import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">GrowRichInvestments</Link>
      <nav>
        <ul className="flex gap-4">
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
          <li><Link to="/investment">Investment</Link></li>
          <li><Link to="/referrals">Referrals</Link></li>
          <li><Link to="/account">Account</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
