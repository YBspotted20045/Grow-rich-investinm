// src/Pages/Vendors.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import "./Vendors.css"; // create this file (CSS provided after JS)

export default function Vendors() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  const amount = sessionStorage.getItem("deposit_amount") || "";
  const user = JSON.parse(localStorage.getItem("gr_user") || "null");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/vendors"); // expected backend route: GET /api/vendors
        // backend might return { vendors: [...] } or array directly
        const list = Array.isArray(res.data) ? res.data : res.data.vendors || [];
        if (list.length === 0) throw new Error("No vendors from server");
        setVendors(list);
      } catch (err) {
        console.warn("Could not fetch vendors from API, using fallback list.", err);
        // fallback vendor list (use international phone numbers, e.g. Nigeria: 234...)
        setVendors([
          { _id: "v-opay", name: "Opay Vendor", whatsapp: "2348012345678" },
          { _id: "v-palm", name: "PalmPay Vendor", whatsapp: "2347012345678" },
          { _id: "v-bank", name: "Bank Transfer Vendor", whatsapp: "2348091234567" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const pickVendor = (v) => {
    if (!amount) {
      setMsg({ type: "error", text: "Pick an amount on the Deposit page first." });
      setTimeout(() => setMsg(null), 2500);
      navigate("/deposit");
      return;
    }
    // store selection and open WhatsApp
    sessionStorage.setItem("selected_vendor", JSON.stringify(v));

    const safePhone = (v.whatsapp || "").replace(/\D/g, "");
    const prefill = `Hello ${v.name || ""}, I want to pay ₦${amount} for a GrowRich deposit. My email: ${user?.email || ""}. Please confirm.`;
    const url = `https://wa.me/${safePhone}?text=${encodeURIComponent(prefill)}`;

    // open WhatsApp (mobile: will open app; desktop: WhatsApp Web)
    window.open(url, "_blank");

    // take them back to Deposit so they can upload the receipt
    setTimeout(() => navigate("/deposit"), 700);
  };

  return (
    <div className="vendors-page">
      <div className="vendors-card">
        <h2>Choose a Vendor</h2>
        {msg && <div className={`notice ${msg.type}`}>{msg.text}</div>}

        <p className="muted">Amount to pay: {amount ? `₦${amount}` : <span className="highlight">(choose amount on Deposit first)</span>}</p>

        {loading ? (
          <p className="muted">Loading vendors…</p>
        ) : (
          <div className="vendors-list">
            {vendors.map((v) => (
              <div className="vendor-item" key={v._id || v.name}>
                <div className="vendor-info">
                  <div className="vendor-title">{v.name || v.title}</div>
                  <div className="vendor-sub">WhatsApp: {v.whatsapp}</div>
                </div>
                <div>
                  <button className="btn" onClick={() => pickVendor(v)}>
                    Contact & Choose
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="small-row">
          <button className="btn outline" onClick={() => navigate("/deposit")}>Back to deposit</button>
        </div>
      </div>
    </div>
  );
}
