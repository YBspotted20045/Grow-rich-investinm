import React, { useState } from "react";
import axios from "./axios.js";
import "./Signup.css"; // CSS specific to this page

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

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

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
      await axios.post("/auth/signup", {
        fullName,
        email,
        password,
        state,
        referral,
      });
      setSuccess("Signup successful! Please login.");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setState("");
      setReferral("");
      setAgree(false);
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
            value={state}
            onChange={(e) => setState(e.target.value)}
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
              <div className="terms-box">
                <h3>GrowRich Investments - Terms & Conditions</h3>
                <p>
                  By creating an account and investing with GrowRich Investments,
                  you fully understand and agree to the following:
                </p>
                <ul>
                  <li>
                    Your investment may generate profits, but{" "}
                    <strong>only while the platform is active and running</strong>.
                    If the website stops operating, your investment and potential
                    profits may be lost.
                  </li>
                  <li>
                    GrowRich Investments does not guarantee continuous operation.
                    The website <strong>may close or shut down at any time</strong>{" "}
                    without notice.
                  </li>
                  <li>
                    Any profits are limited to the time the platform remains
                    functional and may change or stop at any time.
                  </li>
                  <li>
                    GrowRich Investments is <strong>not a bank or financial institution</strong>;
                    it is an online platform for investments at your own risk.
                  </li>
                  <li>
                    By signing up, you confirm that you understand the risks and
                    accept full responsibility for your investments.
                  </li>
                </ul>
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
              <label htmlFor="agree">
                I have read and agree to the Terms & Conditions
              </label>
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
