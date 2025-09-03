import React, { useState, useEffect } from "react";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [eligible, setEligible] = useState(false);
  const [eligibilityMsg, setEligibilityMsg] = useState("");

  useEffect(() => {
    // Simulate backend check (replace with real API later)
    const userData = {
      matured: true, // from backend
      referrals: 2,
      reinvested: false,
    };

    if (!userData.matured) {
      setEligible(false);
      setEligibilityMsg("⚠️ Your investment has not matured yet.");
    } else if (!userData.reinvested && userData.referrals < 2) {
      setEligible(false);
      setEligibilityMsg("⚠️ You need at least 2 referrals to withdraw.");
    } else if (userData.reinvested && userData.referrals < 1) {
      setEligible(false);
      setEligibilityMsg("⚠️ You need at least 1 referral to withdraw after reinvestment.");
    } else {
      setEligible(true);
      setEligibilityMsg("✅ You are eligible to withdraw.");
    }
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setMessage("⚠️ Please enter a valid withdrawal amount.");
      return;
    }
    if (!eligible) {
      setMessage("❌ You are not eligible to withdraw yet.");
      return;
    }

    setMessage(`✅ Withdrawal request of ₦${amount} submitted.`);
    setAmount("");
  };

  return (
    <div className="withdraw-container">
      <h2 className="withdraw-title">Withdraw Funds</h2>

      {/* ✅ Eligibility Section */}
      <div className={`eligibility-card ${eligible ? "eligible" : "not-eligible"}`}>
        <p>{eligibilityMsg}</p>
      </div>

      <div className="withdraw-card">
        <form onSubmit={handleWithdraw}>
          <label className="withdraw-label">Withdrawal Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (₦)"
            className="withdraw-input"
            disabled={!eligible}
          />

          <button type="submit" className="withdraw-button" disabled={!eligible}>
            Submit Withdrawal
          </button>
        </form>

        {message && <p className="withdraw-message">{message}</p>}
      </div>
    </div>
  );
};

export default Withdrawal;
