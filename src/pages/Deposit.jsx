import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Deposit.css";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [copyMessage, setCopyMessage] = useState(""); // For copy feedback
  const fileInputRef = useRef(null);

  // ✅ Fetch user deposits
  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/deposits/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setDeposits(res.data.deposits || []);
      }
    } catch (err) {
      console.error("Error fetching deposits:", err);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  // ✅ Handle upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("📤 Uploading receipt...");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("receipt", receipt);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await API.post("/deposits/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setMessage("✅ Upload successful! Waiting for admin approval...");
        setError(null);

        // Clear inputs
        setAmount("");
        setReceipt(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Refresh deposit list after upload
        await fetchDeposits();
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Deposit error:", err);
      setError("❌ Error processing deposit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check latest deposit to show persistent message
  useEffect(() => {
    if (deposits.length > 0) {
      const latest = deposits[0];
      if (latest.status === "pending") {
        setMessage("⏳ Waiting for admin approval...");
      } else if (latest.status === "approved") {
        setMessage("✅ Approved! Your investment is now active.");
        setTimeout(() => setMessage(null), 15000); // fade after 15s
      } else if (latest.status === "rejected") {
        setMessage("❌ Your deposit was rejected. Please re-upload.");
      }
    }
  }, [deposits]);

  // ✅ Copy account number with feedback
  const handleCopy = () => {
    navigator.clipboard.writeText("6392000298");
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 2000); // remove message after 2s
  };

  return (
    <Layout>
      <div className="deposit-container">
        <h2>Make a Deposit</h2>
        <p>Choose an investment amount to proceed:</p>

        <div className="cards-grid">
          {[10000, 20000].map((amt) => (
            <button
              key={amt}
              type="button"
              className={`info-card ${amount === String(amt) ? "selected" : ""}`}
              onClick={() => setAmount(String(amt))}
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>

        {amount && (
          <div className="info-card mt-4">
            <h3>Payment Instructions</h3>
            <p>
              Please pay <strong>₦{Number(amount).toLocaleString()}</strong> to
              the account below and upload your receipt.
            </p>
            <p>
              <strong>Bank:</strong> Moniepoint MFB
            </p>
            <p>
              <strong>Account Number:</strong> 6392000298{" "}
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  marginLeft: "8px",
                  cursor: "pointer",
                  padding: "2px 6px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#eee",
                }}
                title="Copy account number"
              >
                📋
              </button>
              {copyMessage && (
                <span style={{ marginLeft: "8px", color: "green" }}>
                  {copyMessage}
                </span>
              )}
            </p>
            <p>
              <strong>Account Name:</strong> KELVIN SOMTOCHUKWU NNAJI
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
          <button type="submit" disabled={loading || !amount || !receipt}>
            {loading ? "Uploading..." : "Upload Receipt"}
          </button>
        </form>

        {message && (
          <p className="success-message" style={{ marginTop: "10px" }}>
            {message}
          </p>
        )}
        {error && (
          <p className="error-message" style={{ marginTop: "10px" }}>
            {error}
          </p>
        )}

        {/* ────────────────────────────────
            Deposit Status Table
        ──────────────────────────────── */}
        <div className="deposit-history mt-4">
          <h3>Your Deposits</h3>
          {deposits.length === 0 ? (
            <p style={{ color: "#ccc" }}>No deposits yet.</p>
          ) : (
            <table className="deposit-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((dep) => (
                  <tr key={dep._id}>
                    <td>₦{dep.amount.toLocaleString()}</td>
                    <td>
                      {dep.status === "pending" && (
                        <span style={{ color: "orange" }}>
                          ⏳ Waiting for approval
                        </span>
                      )}
                      {dep.status === "approved" && (
                        <span style={{ color: "limegreen" }}>✅ Approved</span>
                      )}
                      {dep.status === "rejected" && (
                        <span style={{ color: "red" }}>❌ Rejected</span>
                      )}
                    </td>
                    <td>{new Date(dep.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Deposit;
