// src/Pages/Deposit.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaUsers,
  FaMoneyCheck,
  FaUniversity,
  FaPlusCircle,
} from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";
import "./Deposit.css";

export default function Deposit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // ✅ Auth check
        const me = await API.get("/auth/me");
        setUser(me.data);
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleDepositClick = (amount) => {
    navigate("/vendor", { state: { amount } });
  };

  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/deposit" className="active">
              <FaPlusCircle /> Deposit
            </Link>
          </li>
          <li>
            <Link to="/withdrawals">
              <FaMoneyCheck /> Withdrawals
            </Link>
          </li>
          <li>
            <Link to="/account">
              <FaUniversity /> Bank Account
            </Link>
          </li>
          <li>
            <Link to="/vendors">
              <FaWallet /> Vendors
            </Link>
          </li>
          <li>
            <Link to="/referrals">
              <FaUsers /> Referrals
            </Link>
          </li>
        </ul>
        <button
          className="gold-btn mt-4"
          onClick={() => {
            localStorage.removeItem("gr_token"); // ✅ fixed
            navigate("/login");
          }}
        >
          Logout
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <h3>Deposit Packages</h3>
          <div className="muted">User: {user.username || "—"}</div>
        </div>

        <div className="content">
          <div className="deposit-container">
            <table className="deposit-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>₦5,000 Package</td>
                  <td>Start with ₦5,000 and grow your wealth.</td>
                  <td>
                    <button
                      className="vendor-button"
                      onClick={() => handleDepositClick(5000)}
                    >
                      Deposit ₦5,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>₦10,000 Package</td>
                  <td>Double your returns with ₦10,000.</td>
                  <td>
                    <button
                      className="vendor-button"
                      onClick={() => handleDepositClick(10000)}
                    >
                      Deposit ₦10,000
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>₦15,000 Package</td>
                  <td>Go premium with ₦15,000 investment.</td>
                  <td>
                    <button
                      className="vendor-button"
                      onClick={() => handleDepositClick(15000)}
                    >
                      Deposit ₦15,000
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
