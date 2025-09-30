// src/pages/Referrals.jsx
import React, { useEffect, useState } from "react";
import API from "./axios"; // ✅ use your central axios instance
import "./Referrals.css";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // ✅ Fetch referrals and referral code
  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReferrals(res.data.referrals || []);
      if (res.data.referralCode) {
        setReferralCode(res.data.referralCode);

        // 🔥 Use your live domain here
        const baseUrl = "https://grow-rich-investinm.onrender.com";
        setReferralLink(`${baseUrl}/signup?ref=${res.data.referralCode}`);
      }
    } catch (err) {
      console.error("Fetch referrals error:", err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  // ✅ Copy helper
  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied!`);
  };

  // ✅ Safe date formatter (prevents 1970 bug)
  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
  };

  return (
    <div className="referrals-container">
      <h1 className="referrals-title">My Referrals</h1>

      {/* ✅ Referral info card */}
      {referralCode && (
        <div className="referrals-card" style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Your Referral Code:</strong> {referralCode}
          </p>
          <p>
            <strong>Your Referral Link:</strong>{" "}
            <a
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="referral-link"
            >
              {referralLink}
            </a>
          </p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
            <button
              onClick={() => copyText(referralCode, "Referral code")}
              className="copy-btn"
            >
              Copy Code
            </button>
            <button
              onClick={() => copyText(referralLink, "Referral link")}
              className="copy-btn"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      {referrals.length === 0 ? (
        <p className="no-referrals">⚠️ No referrals yet.</p>
      ) : (
        <div className="referrals-card">
          <table className="referrals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Investment Amount</th>
                <th>Investment Date</th>
                <th>Maturity Date</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref._id}>
                  <td>{ref.username}</td>
                  <td>{ref.email}</td>
                  <td>₦{ref.investmentAmount || 0}</td>
                  <td>{formatDate(ref.investmentDate)}</td>
                  <td>{formatDate(ref.maturityDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Referrals;
