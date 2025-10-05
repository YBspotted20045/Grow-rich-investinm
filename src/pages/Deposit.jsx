import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const fileInputRef = useRef(null);

  // ────────────────────────────────
  // Fetch all user deposits on mount
  // ────────────────────────────────
  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/deposits/me", {
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

  // ────────────────────────────────
  // Handle File Upload
  // ────────────────────────────────
  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  // ────────────────────────────────
  // Submit Deposit
  // ────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
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

      setMessage("📤 Uploading receipt...");

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
        fetchDeposits();
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

  // ────────────────────────────────
  // UI
  // ────────────────────────────────
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
              Please pay <strong>₦{Number(amount).toLocaleString()}</strong> to the account below
              and upload your payment receipt.
            </p>
            <p><strong>Bank:</strong> PalmPay</p>
            <p><strong>Account Number:</strong> 8984550866</p>
            <p><strong>Account Name:</strong> Nnaji Kelvin Somtochukwu</p>
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

        {message && <p className="success-message" style={{ marginTop: "10px" }}>{message}</p>}
        {error && <p className="error-message" style={{ marginTop: "10px" }}>{error}</p>}

        {/* ────────────────────────────────
          Deposit Status Section
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
                        <span style={{ color: "orange" }}>⏳ Waiting for approval</span>
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
