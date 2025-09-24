// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "../axios";
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if(password.length < 8){
      setError("Password must be at least 8 characters.");
      return;
    }
    if(password !== confirmPassword){
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post("/auth/signup", {
        fullName, email, password, state, referral
      });
      setSuccess("Signup successful! Please login.");
      setFullName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setState(""); setReferral("");
    } catch(err){
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />

          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          <label>State</label>
          <select value={state} onChange={e => setState(e.target.value)} required>
            <option value="">Select your state</option>
            {states.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
          </select>

          <label>Referral Code (optional)</label>
          <input type="text" placeholder="Referral Code" value={referral} onChange={e => setReferral(e.target.value)} />

          <div className="terms-placeholder">
            {/* Terms & Conditions checkbox will be added later */}
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
