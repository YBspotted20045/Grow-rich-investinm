import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./axios.js";
import "./Signup.css";

const states = [
  "Abia - Umuahia","Adamawa - Yola","Akwa Ibom - Uyo","Anambra - Awka",
  "Bauchi - Bauchi","Bayelsa - Yenagoa","Benue - Makurdi","Borno - Maiduguri",
  "Cross River - Calabar","Delta - Asaba","Ebonyi - Abakaliki","Edo - Benin City",
  "Ekiti - Ado Ekiti","Enugu - Enugu","Gombe - Gombe","Imo - Owerri",
  "Jigawa - Dutse","Kaduna - Kaduna","Kano - Kano","Katsina - Katsina",
  "Kebbi - Birnin Kebbi","Kogi - Lokoja","Kwara - Ilorin","Lagos - Ikeja",
  "Nasarawa - Lafia","Niger - Minna","Ogun - Abeokuta","Ondo - Akure",
  "Osun - Osogbo","Oyo - Ibadan","Plateau - Jos","Rivers - Port Harcourt",
  "Sokoto - Sokoto","Taraba - Jalingo","Yobe - Damaturu","Zamfara - Gusau"
];

const longTermsText = `GROWRICH INVESTMENTS — TERMS & CONDITIONS

PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE PLATFORM. BY CREATING AN ACCOUNT OR ACCESSING ANY PART OF THE PLATFORM YOU AGREE TO BE BOUND BY THESE TERMS.

1. INTRODUCTION
This Agreement sets out the terms on which the user ("you") may access and use the services provided by GrowRich Investments ("we", "us", "our"). We operate an investment matching and deposit verification platform. Use of this site implies acceptance of these terms.

2. NATURE OF SERVICE
We provide a platform that allows users to submit deposits and payment evidence for verification. We do not act as a banking institution nor guarantee profits. Projections are estimates only.

3. RISK & LIABILITY
Investing involves risk. Past performance is not a promise of future gains. You accept full responsibility for all outcomes.

4. REFERRALS & PAYOUTS
Referral requirements, payout rules, and timelines are determined by the platform and may change at any time.

5. USER OBLIGATIONS
You agree to provide accurate details and avoid submitting fraudulent receipts. Violation may result in permanent ban.

6. PLATFORM CONTINUITY
GrowRich may suspend operations or terminate the platform at any time without notice. Users acknowledge that profits only exist while the platform remains active.

7. LEGAL NOTICE
This document governs your relationship with the platform. Continued use constitutes acceptance. Read carefully.

(Additional legal and operational terms continue beyond this summary...)`;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) setReferral(ref);
  }, [location]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!agree) return setError("You must agree to the Terms & Conditions.");

    try {
      setLoading(true);
      const res = await axios.post("/auth/signup", {
        fullName,
        email,
        password,
        state: stateValue,
        referralCode: referral,
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess("Signup successful! Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container animated">
        <h1 className="signup-title">Create Account</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={loading}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />

          <label>State</label>
          <select
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select your state</option>
            {states.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>

          <label>Referral Code (optional)</label>
          <input
            type="text"
            placeholder="Referral Code"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            disabled={loading}
          />

          <div className="terms-container">
            <button
              type="button"
              className="toggle-terms"
              onClick={() => setShowTerms(!showTerms)}
              disabled={loading}
            >
              {showTerms ? "Hide Terms & Conditions ▲" : "Show Terms & Conditions ▼"}
            </button>

            {showTerms && (
              <div className="terms-box">
                <pre className="terms-text">{longTermsText}</pre>
              </div>
            )}

            <div className="agree-box">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="agree">I have read and agree to the Terms & Conditions</label>
            </div>
          </div>

          <button type="submit" disabled={!agree || loading} className={!agree || loading ? "disabled-btn" : ""}>
            {loading ? <span className="spinner"></span> : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
