// src/pages/Deposit.jsx
import React, { useState } from "react";
import API from "../axios";
import "./Deposit.css";

const packages = [
  { amount: 10000, desc: "Secure your future with ₦10,000 investment." },
  { amount: 20000, desc: "Boost your wealth with ₦20,000 premium plan." },
];

export default function Deposit() {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async () => {
    if (!selected) return setMessage({ type: "error", text: "⚠️ Select an amount first." });
    if (!file) return setMessage({ type: "error", text: "⚠️ Please upload the receipt." });

    setLoading(true);
    setMessage({ type: "info", text: "⏳ Uploading receipt..." });

    try {
      const formData = new FormData();
      formData.append("amount", selected);
      formData.append("receipt", file);

      const res = await API.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: res.data?.message || "✅ Upload successful." });
      setFile(null);
      setSelected(null);
    } catch (err) {
      console.error("Upload error:", err);
      const text =
        err?.response?.data?.message ||
        err?.message ||
        "❌ Upload failed. Please try again.";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">💰 Deposit Packages</h2>

      <div className="deposit-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.amount}
            className={`deposit-card ${selected === pkg.amount ? "active" : ""}`}
          >
            <h3 className="deposit-package">₦{pkg.amount.toLocaleString()}</h3>
            <p className="deposit-description">{pkg.desc}</p>
            <button className="deposit-btn" onClick={() => setSelected(pkg.amount)}>
              Deposit ₦{pkg.amount.toLocaleString()}
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="deposit-details">
          <h3 className="details-title">Complete Your Payment</h3>

          <div className="account-card">
            <p><strong>Bank Name:</strong> Access Bank</p>
            <p><strong>Account Number:</strong> 1234567890</p>
            <p><strong>Account Name:</strong> GrowRich Investments</p>
            <p className="note">
              💡 Please transfer exactly ₦{selected.toLocaleString()} and upload your payment receipt below.
            </p>
          </div>

          <div className="upload-section">
            <label className="upload-label">Upload Payment Receipt</label>
            <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
            <div style={{ marginTop: 10 }}>
              <button
                className="confirm-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit Payment"}
              </button>
            </div>

            {message && (
              <div
                className={`msg ${
                  message.type === "error"
                    ? "err"
                    : message.type === "success"
                    ? "ok"
                    : "info"
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
              }
