// src/Pages/ReferralDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import API from "../axios";
import "./ReferralDashboard.css";

export default function ReferralDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = localStorage.getItem("gr_token");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const res = await API.get("/auth/me");
        const meData = res.data?.user || res.data;

        if (!meData) {
          setError("Could not read user info from server response.");
        } else if (mounted) {
          setUser(meData);
        }
      } catch (err) {
        console.error("Fetch /auth/me error:", err);
        const status = err.response?.status;
        if (status === 401) {
          localStorage.removeItem("gr_token");
          navigate("/login", { replace: true });
          return;
        }
        setError("Unable to load referral dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const copyCode = async () => {
    if (!user?.referralCode) return;
    try {
      await navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const shareLink = async () => {
    const code = user?.referralCode;
    if (!code) return;
    const shareUrl = `${window.location.origin}/signup?ref=${encodeURIComponent(
      code
    )}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join GrowRich",
          text: `Use my referral code: ${code}`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Native share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy link failed:", err);
      }
    }
  };

  if (loading) return <div className="rd-loader">Loading...</div>;
  if (!user && error) return <div className="rd-error">⚠️ {error}</div>;

  // ✅ Referral stats from backend
  const referralStats = user?.referrals || {};
  const referrals = referralStats.users || [];
  const totalReferrals = referralStats.total || 0;
  const totalReferralDeposits = referralStats.paid || 0;
  const requirementMet = referralStats.ok || false;

  return (
    <div className="rd-page">
      <div className="rd-header">
        <h2>Referral Dashboard</h2>
        <div className="rd-user">
          Welcome, {user?.username || user?.fullname || "Investor"}
        </div>
      </div>

      <div className="rd-topgrid">
        <div className="rd-metric">
          <div className="rd-metric-label">Total Referrals</div>
          <div className="rd-metric-value">{totalReferrals}</div>
        </div>

        <div className="rd-metric">
          <div className="rd-metric-label">Referral Deposits</div>
          <div className="rd-metric-value">₦{totalReferralDeposits}</div>
        </div>

        <div className="rd-metric">
          <div className="rd-metric-label">Requirement Met</div>
          <div className={`rd-metric-value ${requirementMet ? "ok" : "bad"}`}>
            {requirementMet ? "Yes" : "No"}
          </div>
        </div>
      </div>

      <section className="rd-codebox">
        <div className="rd-code-left">
          <div className="rd-code-title">Your Referral Code</div>
          <div className="rd-code">{user?.referralCode || "N/A"}</div>
        </div>

        <div className="rd-code-actions">
          <button className="rd-btn" onClick={copyCode}>
            <FaCopy /> Copy
          </button>
          <button className="rd-btn outline" onClick={shareLink}>
            <FaShareAlt /> Share
          </button>
          {copied && <div className="rd-copied">Copied!</div>}
        </div>
      </section>

      <section className="rd-table-wrap">
        <h3>Your Referrals</h3>

        {referrals.length === 0 ? (
          <p className="rd-muted">You have not referred anyone yet.</p>
        ) : (
          <table className="rd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Investment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, i) => (
                <tr key={r.id || r._id || i}>
                  <td>{i + 1}</td>
                  <td>{r.fullname || r.username || "—"}</td>
                  <td>{r.email || "—"}</td>
                  <td>₦{r.investmentAmount || 0}</td>
                  <td>
                    {r.date
                      ? new Date(r.date).toLocaleDateString()
                      : r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {error && <div className="rd-error-inline">{error}</div>}
    </div>
  );
}
