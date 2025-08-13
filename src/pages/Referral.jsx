// src/pages/Referral.jsx
import React, { useState, useEffect } from "react";
import API from "../axios";

const Referral = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [investmentTier, setInvestmentTier] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "https://grow-0nfm.onrender.com";

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReferralCode(res.data.referralCode || "");
        setReferrals(res.data.referrals || []);
        setInvestmentTier(res.data.investmentTier || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  const renderRules = () => {
    switch (investmentTier) {
      case "₦10,000":
        return "You can refer anyone (10k, 15k, or 20k)";
      case "₦15,000":
        return "You can refer ₦10,000 or ₦15,000 investors";
      case "₦20,000":
        return "You can only refer ₦20,000 investors";
      default:
        return "No investment tier found. Please invest first.";
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">👥 Referral Program</h1>

        {/* Referral Link */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-gray-700">Your Referral Link:</p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="border rounded px-2 py-1 w-full max-w-md"
            />
            <button
              onClick={copyToClipboard}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Referral Rules */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="font-bold mb-2">Referral Rules</h2>
          <p>{renderRules()}</p>
        </div>

        {/* Referral Stats */}
        <div className="mb-6">
          <h2 className="font-bold mb-2">Your Referrals ({referrals.length})</h2>
          {referrals.length > 0 ? (
            <ul className="list-disc list-inside">
              {referrals.map((ref, index) => (
                <li key={index}>
                  {ref.name || "Unknown"} — {ref.investmentAmount || "No investment"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No referrals yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referral;
