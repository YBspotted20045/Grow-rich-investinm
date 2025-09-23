// src/Pages/ReferralDashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

function ReferralDashboard() {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [referralLink, setReferralLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await API.get("/referrals", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReferrals(res.data?.referrals || []);
        setReferralLink(res.data?.referralLink || "");
      } catch (err) {
        console.error("Error loading referrals:", err);
        setMessage("Could not load referral data.");
      }
    })();
  }, [navigate]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setMessage("Referral link copied!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Referral Dashboard</h2>

        <div style={styles.section}>
          <p><strong>Your Referral Link:</strong></p>
          <div style={styles.linkBox}>
            <input
              type="text"
              value={referralLink}
              readOnly
              style={styles.linkInput}
            />
            <button onClick={copyLink} style={styles.copyButton}>
              Copy
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <p><strong>Total Referrals:</strong> {referrals.length}</p>
          {referrals.length === 0 ? (
            <p style={styles.emptyText}>No referrals yet.</p>
          ) : (
            <ul style={styles.referralList}>
              {referrals.map((ref, index) => (
                <li key={index} style={styles.referralItem}>
                  <span>{ref.email}</span>
                  <span>
                    Invested: ₦{ref.investmentAmount || 0} |{" "}
                    {ref.hasReinvested ? "Reinvested" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: "20px",
  },
  linkBox: {
    display: "flex",
    alignItems: "center",
  },
  linkInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  copyButton: {
    padding: "10px 15px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  referralList: {
    listStyle: "none",
    padding: 0,
  },
  referralItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
  },
  emptyText: {
    color: "#666",
    fontStyle: "italic",
  },
  message: {
    textAlign: "center",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default ReferralDashboard;
