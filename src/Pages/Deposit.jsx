import React, { useState } from "react";
import axios from "../axios"; // Make sure baseURL points to your backend
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

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!selected) {
      setMessage("Please select a deposit package.");
      return;
    }
    if (!file) {
      setMessage("Please upload your payment receipt.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("amount", selected);
      formData.append("receipt", file);

      const res = await axios.post("/deposits/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Payment submitted successfully!");
      setFile(null);
    } catch (err) {
      console.error("Deposit submit error:", err);
      setMessage(err.response?.data?.message || "Failed to submit payment.");
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
            <p><strong>Bank Name:</strong> opay</p>
            <p><strong>Account Number:</strong> 8149253500</p>
            <p><strong>Account Name:</strong> GrowRich Investments</p>
            <p className="note">
              💡 Please transfer exactly ₦{selected.toLocaleString()} and upload your payment receipt below.
            </p>
          </div>

          <div className="upload-section">
            <label className="upload-label">Upload Payment Receipt</label>
            <input type="file" className="upload-input" onChange={handleFileChange} />
            <button className="confirm-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Payment"}
            </button>
            {message && <p className="upload-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
