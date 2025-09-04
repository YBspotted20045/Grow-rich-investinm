import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaWallet, FaUsers, FaMoneyCheck, FaUniversity, FaPlusCircle, FaCopy } from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";
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
    <div className="page-shell">
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li><Link to="/dashboard"><FaHome /> Dashboard</Link></li>
          <li><Link to="/investments"><FaWallet /> Investments</Link></li>
          <li><Link to="/referrals" className="active"><FaUsers /> Referral Dashboard</Link></li>
          <li><Link to="/withdrawals"><FaMoneyCheck /> Withdrawals</Link></li>
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
          <h3>Referral Dashboard</h3>
          <div className="muted">User: {user?.fullname || "—"}</div>
        </div>

        <div className="content">
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
      </main>
    </div>
  );
                                                                      }
