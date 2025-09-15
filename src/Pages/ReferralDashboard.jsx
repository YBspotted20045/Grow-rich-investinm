// src/Pages/ReferralDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import API from "../axios";
import "./ReferralDashboard.css";

export default function ReferralDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const me = await API.get("/auth/me");
        setUser(me.data.user);

        const res = await API.get("/referrals/my");
        setReferrals(res.data || []);
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  const copyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="referral-page">
      <div className="topbar">
        <h3>Referral Dashboard</h3>
        <div className="muted">User: {user?.fullname || "—"}</div>
      </div>

      {/* Referral Code Section */}
      <div className="referral-box">
        <h4>Your Referral Code</h4>
        <div className="referral-code">
          <span>{user?.referralCode || "N/A"}</span>
          <button onClick={copyCode} className="copy-btn">
            <FaCopy />
          </button>
        </div>
        {copied && <div className="copied-msg">Copied!</div>}
      </div>

      {/* Referral Table */}
      <div className="referral-table-wrapper">
        <h4>Your Referrals</h4>
        {referrals.length === 0 ? (
          <p className="muted">No referrals yet.</p>
        ) : (
          <table className="referral-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Investment</th>
                <th>Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, i) => (
                <tr key={i}>
                  <td>{r.fullname}</td>
                  <td>{r.email}</td>
                  <td>₦{r.investmentAmount || 0}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
