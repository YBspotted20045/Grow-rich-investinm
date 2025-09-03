import React from "react";
import { useLocation } from "react-router-dom";
import "./Vendors.css"; // ✅ Import Vendor CSS

const Vendor = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  // Replace with your real vendor list
  const vendors = [
    { id: 1, name: "Vendor A", whatsapp: "2348012345678" },
    { id: 2, name: "Vendor B", whatsapp: "2348098765432" },
    { id: 3, name: "Vendor C", whatsapp: "2348076543210" },
  ];

  const sendToWhatsApp = (number) => {
    const message = `Hello, I want to deposit ₦${amount} into GrowRich.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="vendor-container">
      <h2 className="vendor-title">Select a Vendor</h2>
      <p className="vendor-subtext">
        Deposit Amount: <strong>₦{amount}</strong>
      </p>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div className="vendor-card" key={vendor.id}>
            <div className="vendor-info">
              <h3 className="vendor-name">{vendor.name}</h3>
              <p className="vendor-number">{vendor.whatsapp}</p>
            </div>
            <button
              className="vendor-button"
              onClick={() => sendToWhatsApp(vendor.whatsapp)}
            >
              Contact on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendor;
