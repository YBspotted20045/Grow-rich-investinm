// src/pages/Withdrawal.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaWallet, FaUsers, FaMoneyCheck, FaUniversity, FaPlusCircle } from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";
import "./Withdrawal.css";

export default function Withdrawal() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [eligibility, setEligibility] = useState({ eligible: false, reason: "" });
  const [withdrawing, setWithdrawing] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me = await API.get("/auth/me");
        setUser(me.data);

        const res = await API.get("/withdrawals/eligibility");
        setEligibility(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    })();
  }, [navigate]);

  const requestWithdrawal = async () => {
    try {
      setWithdrawing(true);
      const res = await API.post("/withdrawals/request");
      setToast(res.data?.message || "Withdrawal requested.");
      const check = await API.get("/withdrawals/eligibility");
      setEligibility(check.data);
    } catch (err) {
      setToast(err.response?.data?.message || "Unable to request withdrawal.");
    } finally {
      setWithdrawing(false);
    }
  };

  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li><Link to="/dashboard"><FaHome /> Dashboard</Link></li>
          <li><Link to="/investments"><FaWallet /> Investments</Link></li>
          <li><Link to="/referrals"><FaUsers /> Referrals</Link></li>
          <li><Link to="/withdrawals" className="active"><FaMoneyCheck /> Withdrawals</Link></li>
          <li><Link to="/account"><FaUniversity /> Bank Account</Link></li>
          <li><Link to="/deposit"><FaPlusCircle /> Deposit</Link></li>
        </ul>
        <button
          className="gold-btn mt-4"
          onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        >
          Logout
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <h3>Withdraw Funds</h3>
          <div className="muted">User: {user?.fullname || "—"}</div>
        </div>

        <div className="content">
          <div className="withdraw-card">
            <h4>Withdrawal Eligibility</h4>
            <p className={eligibility.eligible ? "text-success" : "text-danger"}>
              {eligibility.reason || (eligibility.eligible ? "You are eligible to withdraw." : "Not eligible.")}
            </p>

            <button
              className="gold-btn"
              disabled={!eligibility.eligible || withdrawing}
              onClick={requestWithdrawal}
            >
              {withdrawing ? "Processing..." : "Request Withdrawal"}
            </button>

            {toast && (
              <div className="toast">
                {toast}
                <button onClick={() => setToast("")}>Dismiss</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
