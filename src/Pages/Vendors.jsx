import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Vendors.css";

const Vendors = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const amount = params.get("amount");

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [evidence, setEvidence] = useState(null);

  // Vendors list (add your real vendors here)
  const vendors = [
    {
      id: 1,
      name: "Vendor A",
      phone: "2348012345678", // must be WhatsApp-enabled
    },
    {
      id: 2,
      name: "Vendor B",
      phone: "2348098765432",
    },
  ];

  // Generate WhatsApp link
  const handleContact = (vendor) => {
    setSelectedVendor(vendor);
    const message = `Hello ${vendor.name}, I want to make a deposit of ₦${amount} for my investment.`;
    window.open(
      `https://wa.me/${vendor.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Handle evidence upload
  const handleEvidenceChange = (e) => {
    setEvidence(e.target.files[0]);
  };

  const handleEvidenceSubmit = (e) => {
    e.preventDefault();
    if (!evidence || !selectedVendor) {
      alert("Please select a vendor and upload evidence before submitting.");
      return;
    }
    alert(`Evidence uploaded for ${selectedVendor.name}. (Connect this to backend)`);
  };

  return (
    <div className="vendors-page">
      <h2 className="vendors-title">Choose a Vendor</h2>
      <p className="vendors-subtitle">
        Selected Deposit Amount: <strong>₦{amount}</strong>
      </p>

      <div className="vendors-list">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <h3>{vendor.name}</h3>
            <p>WhatsApp: +{vendor.phone}</p>
            <button
              className="vendor-btn"
              onClick={() => handleContact(vendor)}
            >
              Contact Vendor
            </button>
          </div>
        ))}
      </div>

      {selectedVendor && (
        <form className="evidence-form" onSubmit={handleEvidenceSubmit}>
          <h3>Upload Payment Evidence</h3>
          <input type="file" onChange={handleEvidenceChange} />
          <button type="submit" className="upload-btn">
            Submit Evidence
          </button>
        </form>
      )}
    </div>
  );
};

export default Vendors;
