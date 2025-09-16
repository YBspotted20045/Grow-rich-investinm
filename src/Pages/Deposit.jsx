// src/pages/Deposit.jsx
import React, { useState } from "react";
import API from "../axios"; // ✅ make sure this points to your backend
import "./Deposit.css";

const packages = [
  { amount: 10000, desc: "Secure your future with ₦10,000 investment." },
  { amount: 20000, desc: "Boost your wealth with ₦20,000 premium plan." },
];

const Deposit = () => {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!file || !selected) {
      return setMessage("⚠️ Please select a package and upload a receipt");
    }

    const formData = new FormData();
    formData.append("amount", selected);
    formData.append("receipt", file); // ✅ must match backend multer field

    try {
      setLoading(true);
      const res = await API.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "✅ Payment submitted successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-title">💰 Deposit Packages</h2>

      <div className="deposit-grid">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`deposit-card ${selected === pkg.amount ? "active" : ""}`}
          >
            <h3 className="deposit-package">₦{pkg.amount.toLocaleString()}</h3>
            <p className="deposit-description">{pkg.desc}</p>
            <button
              className="deposit-btn"
              onClick={() => setSelected(pkg.amount)}
            >
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
            <input
              type="file"
              className="upload-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className="confirm-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit Payment"}
            </button>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
