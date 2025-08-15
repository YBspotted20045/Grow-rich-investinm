import React, { useState } from "react";
import "./InvestmentForm.css";

const InvestmentForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    referralCode: "",
    email: "",
    receipt: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "receipt") {
      setFormData({ ...formData, receipt: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // API call will go here later
    setTimeout(() => {
      alert("Investment submitted successfully!");
      setIsSubmitting(false);
      setFormData({
        amount: "",
        referralCode: "",
        email: "",
        receipt: null,
      });
    }, 1000);
  };

  return (
    <div className="investment-form-container">
      <h2>Invest Now</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Investment Amount (₦):
          <select
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          >
            <option value="">Select amount</option>
            <option value="5000">₦5,000</option>
            <option value="10000">₦10,000</option>
            <option value="15000">₦15,000</option>
          </select>
        </label>

        <label>
          Referral Code:
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>

        <label>
          Payment Receipt:
          <input
            type="file"
            name="receipt"
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Investment"}
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
