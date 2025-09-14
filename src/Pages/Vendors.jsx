// src/Pages/Vendors.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Vendors.css";

const Vendors = () => {
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [receipt, setReceipt] = useState(null);

  // Example vendor list
  const vendors = [
    { name: "Kelvin", phone: "2347012345678" },
    { name: "Chidera", phone: "2348098765432" },
  ];

  const handleWhatsApp = (phone) => {
    const message = `Hello, I want to make a deposit of ₦${amount.toLocaleString()} into GrowRich Investments.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
    alert("Receipt uploaded successfully (demo). Backend API will handle saving.");
  };

  return (
    <div className="vendors-container">
      <h2 className="vendors-title">Choose a Vendor</h2>
      <p className="vendors-sub">Deposit Amount: ₦{amount.toLocaleString()}</p>

      <div className="vendors-list">
        {vendors.map((vendor, idx) => (
          <div className="vendor-card" key={idx}>
            <h3>{vendor.name}</h3>
            <button
              className="vendor-btn"
              onClick={() => handleWhatsApp(vendor.phone)}
            >
              Pay via WhatsApp
            </button>
          </div>
        ))}
      </div>

      <div className="receipt-upload">
        <h3>Upload Payment Evidence</h3>
        <input type="file" onChange={handleReceiptUpload} />
        {receipt && <p className="receipt-name">Uploaded: {receipt.name}</p>}
      </div>
    </div>
  );
};

export default Vendors;
