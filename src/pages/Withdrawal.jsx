// src/Pages/Withdrawal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

function Withdrawal() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [referralOk, setReferralOk] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user profile (balance + referral check)
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.user || {};
        setBalance(data.investmentAmount || 0);
        setReferralOk(res.data?.referralRequirementMet || false);

        setBankName(data.bankName || "");
        setAccountName(data.accountName || "");
        setAccountNumber(data.accountNumber || "");
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referralOk) {
      setMessage("You must meet the referral requirement before withdrawing.");
      return;
    }
    if (!bankName || !accountName || !accountNumber) {
      setMessage("Please provide all bank details.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await API.post(
        "/withdraw",
        { bankName, accountName, accountNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Withdrawal request submitted!");
    } catch (err) {
      console.error("Withdrawal error:", err);
      setMessage("Error requesting withdrawal. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Withdrawal</h2>

        <div style={styles.infoBox}>
          <p><strong>Current Balance:</strong> ₦{balance}</p>
          <p>
            <strong>Referral Requirement:</strong>{" "}
            {referralOk ? "✅ Met" : "❌ Not Met"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Account Name</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Request Withdrawal"}
          </button>
        </form>

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
    maxWidth: "500px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  infoBox: {
    background: "#f1f1f1",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default Withdrawal;
