// src/Pages/ReferralDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import API from "../axios";
import "./ReferralDashboard.css";

export default function ReferralDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = localStorage.getItem("gr_token");
        if (!token) {
          // no token -> send to login
          navigate("/login", { replace: true });
          return;
        }

        // fetch user and referrals in parallel
        const [meResult, referralsResult] = await Promise.allSettled([
          API.get("/auth/me"),
          API.get("/referrals/my"),
        ]);

        // handle /auth/me result
        if (meResult.status === "fulfilled") {
          const meData = meResult.value.data?.user || meResult.value.data;
          if (!meData) {
            // backend returned something unexpected but don't immediately logout
            setError("Could not read user info from server response.");
          } else if (mounted) {
            setUser(meData);
          }
        } else {
          // something failed when fetching user
          const status = meResult.reason?.response?.status;
          if (status === 401) {
            // only logout on 401
            localStorage.removeItem("gr_token");
            navigate("/login", { replace: true });
            return;
          }
          console.error("Fetch /auth/me error:", meResult.reason);
          setError("Unable to load user info (server).");
        }

        // handle referrals result
        if (referralsResult.status === "fulfilled") {
          const r = referralsResult.value.data || [];
          if (mounted) setReferrals(r);
        } else {
          const status = referralsResult.reason?.response?.status;
          if (status === 401) {
            localStorage.removeItem("gr_token");
            navigate("/login", { replace: true });
            return;
          }
          console.error("Fetch /referrals/my error:", referralsResult.reason);
          // don't overwrite a previous error if there is one
          if (!error) setError("Could not load referrals.");
        }
      } catch (err) {
        console.error("ReferralDashboard unexpected error:", err);
        if (!error) setError("Unexpected error loading referral dashboard.");
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
    const shareUrl = `${window.location.origin}/signup?ref=${encodeURIComponent(code)}`;
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
      // fallback: copy share URL
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

  // if nothing loaded and error exist
  if (!user && !referrals.length && error) {
    return <div className="rd-error">⚠️ {error}</div>;
  }

  // computed metrics
  const totalReferrals = referrals.length;
  const totalReferralDeposits = user?.referralDeposits ?? 0;
  const requirementMet = user?.referralRequirementMet ?? false;

  return (
    <div className="rd-page">
      <div className="rd-header">
        <h2>Referral Dashboard</h2>
        <div className="rd-user">Welcome, {user?.username || user?.fullname || "Investor"}</div>
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
          <button className="rd-btn" onClick={copyCode}><FaCopy /> Copy</button>
          <button className="rd-btn outline" onClick={shareLink}><FaShareAlt /> Share</button>
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
                <tr key={r._id || i}>
                  <td>{i + 1}</td>
                  <td>{r.fullname || r.username || "—"}</td>
                  <td>{r.email || "—"}</td>
                  <td>₦{r.investmentAmount || 0}</td>
                  <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}</td>
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
