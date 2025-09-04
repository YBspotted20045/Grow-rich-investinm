import React, { useEffect, useState } from "react";
import API from "../axios";
import "../Pages/Withdrawal.css";

const Withdrawal = () => {
  const [user, setUser] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);

        // Check eligibility
        const eligibilityRes = await API.get("/withdraw/eligibility");
        setEligibility(eligibilityRes.data);
      } catch (error) {
        console.error("Error fetching user/eligibility:", error);
      }
    };
    fetchData();
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.post("/withdraw", { amount });
      setMessage(res.data.message);
      setAmount("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Withdrawal failed. Try again."
      );
    }
  };

  return (
    <div className="withdrawal-container">
      <h2 className="withdrawal-title">Withdrawal</h2>

      {user && (
        <div className="withdrawal-user-info">
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Bank:</strong> {user.bankName || "Not provided"}
          </p>
          <p>
            <strong>Account Number:</strong> {user.accountNumber || "Not provided"}
          </p>
        </div>
      )}

      {eligibility ? (
        <div className="eligibility success">✅ You are eligible to withdraw</div>
      ) : (
        <div className="eligibility error">⏳ You are not eligible yet</div>
      )}

      <form onSubmit={handleWithdraw} className="withdrawal-form">
        <label>Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5000"
          required
        />
        <button type="submit" className="withdrawal-btn" disabled={!eligibility}>
          Withdraw
        </button>
      </form>

      {message && <div className="withdrawal-message">{message}</div>}
    </div>
  );
};

export default Withdrawal;
