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
This Agreement sets out the terms on which the user ("you", "your") may access and use the services provided by GrowRich Investments ("we", "us", "our"). We operate an investment matching and deposit verification platform. Use of this site implies acceptance of these terms.

2. NATURE OF SERVICE
We provide a platform that allows users to submit deposits and evidence of payment for verification by our administrative team. We do not act as a banking institution, nor do we hold client funds. All deposits uploaded are evidence intended for administrative verification. The platform may provide projected earnings and schedules; such projections are estimates only and are not guarantees of return.

3. RISKS & NO GUARANTEE
Investing carries risk. Past performance is not indicative of future results. GrowRich Investments makes no guarantees of profits or continuous operation of the platform. The platform may be suspended, degraded or terminated at our sole discretion. You accept all risk of loss of capital.

4. USER OBLIGATIONS
You shall provide true, accurate and complete information. You shall not submit fraudulent, forged or manipulated receipts. You shall comply with all applicable laws and regulations. We reserve the right to suspend or ban accounts suspected of fraudulent activity.

5. DEPOSIT VERIFICATION & APPROVAL
Deposits uploaded via the platform are subject to manual verification by administrators. Approval is required to activate associated investment records. Approval times vary and are not guaranteed. If a deposit is rejected, administrators will mark the entry and may provide a reason.

6. PAYOUTS & MATURITY
Project timelines and payout formulas shown on the platform are informational. Withdrawals and payouts are subject to verification, availability, and admin approval. Where referral-based eligibility is required, you must satisfy the referral criteria specified by the platform to become eligible for withdrawal.

7. REFERRALS
Referral incentives or conditions are subject to change. Referral tracking and eligibility is determined by data recorded on our platform. We reserve the right to invalidate referrals determined to be abusive or fraudulent.

8. INTELLECTUAL PROPERTY
All content, graphics, logos, software, and trade marks on the platform are the intellectual property of GrowRich Investments or its licensors. You may not reproduce, copy or create derivative works without prior written consent.

9. PRIVACY
We collect personal information in accordance with our privacy policy. By creating an account you consent to our collection and handling of your information.

10. LIMITATION OF LIABILITY
To the maximum extent permitted by law, GrowRich Investments shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the platform.

11. AMENDMENTS
We may modify these terms at any time. Continued use of the service after notice constitutes acceptance.

12. GOVERNING LAW
These Terms are governed by the laws of the jurisdiction in which GrowRich Investments is operated; disputes are subject to the courts in that jurisdiction.

(End of Terms — continued text omitted for brevity; the full policy contains additional procedural and legal provisions.)`;

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

  // auto-fill referral from URL param ?ref=xxxx
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const refCode = params.get("ref");
    if (refCode) setReferral(refCode);
  }, [location]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms & Conditions before signing up.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        fullName,
        email,
        password,
        state: stateValue,
        referralCode: referral,
      };

      const res = await axios.post("/auth/signup", payload);

      // If backend returns token, save and navigate to dashboard immediately.
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess("Signup successful! Redirecting to dashboard...");
        // small delay so user sees success
        setTimeout(() => navigate("/dashboard"), 800);
        return;
      }

      // Otherwise, show message and go to login after short delay
      setSuccess(res.data?.message || "Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || err.message || "Signup failed.");
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
              <option key={idx} value={s}>
                {s}
              </option>
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

          {/* Collapsible Terms */}
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
              <div className="terms-box" aria-live="polite">
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

          <button
            type="submit"
            disabled={!agree || loading}
            className={!agree || loading ? "disabled-btn" : ""}
          >
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
