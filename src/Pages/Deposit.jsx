// src/Pages/Deposit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";
import "./Deposit.css"; // create this file (CSS provided after JS)

export default function Deposit() {
  const navigate = useNavigate();
  const savedAmount = sessionStorage.getItem("deposit_amount") || "";
  const savedVendor = sessionStorage.getItem("selected_vendor");
  const [amount, setAmount] = useState(savedAmount);
  const [vendor, setVendor] = useState(savedVendor ? JSON.parse(savedVendor) : null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const user = JSON.parse(localStorage.getItem("gr_user") || "null");

  useEffect(() => {
    // refresh local state from sessionStorage if user comes back from Vendors
    const v = sessionStorage.getItem("selected_vendor");
    if (v) setVendor(JSON.parse(v));
    const a = sessionStorage.getItem("deposit_amount");
    if (a) setAmount(a);
  }, []);

  const gotoVendors = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMsg({ type: "error", text: "Choose an amount first." });
      return;
    }
    sessionStorage.setItem("deposit_amount", amount);
    navigate("/vendors");
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const submitReceipt = async (e) => {
    e.preventDefault();
    if (!vendor) {
      setMsg({ type: "error", text: "No vendor selected — choose a vendor first." });
      return;
    }
    if (!file) {
      setMsg({ type: "error", text: "Please attach the payment receipt file." });
      return;
    }

    setLoading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("amount", amount);
      fd.append("vendor", vendor.name || vendor.title || "");
      fd.append("vendorWhatsapp", vendor.whatsapp || "");
      fd.append("receipt", file);

      // backend expects token via header (axios interceptors handle gr_token)
      await API.post("/deposits", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg({ type: "success", text: "Receipt uploaded — pending admin approval." });
      // cleanup stored selection
      sessionStorage.removeItem("selected_vendor");
      sessionStorage.removeItem("deposit_amount");
      setTimeout(() => navigate("/dashboard"), 1400);
    } catch (err) {
      console.error("Upload error:", err);
      setMsg({
        type: "error",
        text: err?.response?.data?.message || "Upload failed — try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">
      <div className="deposit-card">
        <h2>Make a Deposit</h2>

        {msg && <div className={`notice ${msg.type}`}>{msg.text}</div>}

        <label>Choose amount</label>
        <div className="amount-row">
          <select value={amount} onChange={(e) => setAmount(e.target.value)}>
            <option value="">Select a preset</option>
            <option value="5000">₦5,000</option>
            <option value="10000">₦10,000</option>
            <option value="15000">₦15,000</option>
            <option value="20000">₦20,000</option>
          </select>

          <input
            type="number"
            placeholder="Or enter custom amount"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="small-row">
          <button className="btn" onClick={gotoVendors}>
            Choose Vendor (WhatsApp)
          </button>
          <Link to="/vendors" className="link-plain">Or browse vendors</Link>
        </div>

        <hr />

        <h3>Selected vendor</h3>
        {vendor ? (
          <div className="vendor-block">
            <div className="vendor-name">{vendor.name || vendor.title}</div>
            <div className="vendor-whatsapp">WhatsApp: {vendor.whatsapp}</div>
            <div className="vendor-actions">
              <button
                className="btn outline"
                onClick={() => {
                  // re-open WhatsApp if they want to pay again
                  const phone = (vendor.whatsapp || "").replace(/\D/g, "");
                  const message = `Hello ${vendor.name || ""}, I want to pay ₦${amount} for GrowRich deposit. My email: ${user?.email || ""}`;
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                Open WhatsApp
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  sessionStorage.removeItem("selected_vendor");
                  setVendor(null);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <p className="muted">No vendor selected yet — click "Choose Vendor" to pick one via WhatsApp.</p>
        )}

        <hr />

        <h3>Upload receipt</h3>
        <form className="upload-form" onSubmit={submitReceipt}>
          <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
          <small className="muted">Attach the payment receipt (photo or PDF).</small>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Uploading…" : "Upload Receipt"}
          </button>
        </form>

        <p className="muted">After upload the admin will confirm the payment and credit your account.</p>
      </div>
    </div>
  );
}
