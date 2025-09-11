// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import API from "../axios";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (form.password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters." });
      setLoading(false);
      return;
    }
    if (parseInt(form.age, 10) < 18) {
      setMessage({ type: "error", text: "You must be 18+ to register." });
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      // backend expects username (not fullName) — map it here
      const payload = {
        username: form.fullName,
        email: form.email,
        password: form.password,
        state: form.state,
        referralCode: form.referralCode || undefined,
        referredBy: form.referralCode || undefined,
      };

      await API.post("/auth/signup", payload);

      setMessage({ type: "success", text: "Signup successful — redirecting to login…" });
      setTimeout(() => navigate("/login", { replace: true }), 1000);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error during signup. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <select name="state" value={form.state} onChange={handleChange} required disabled={loading}>
          <option value="">Select State</option>
          {/* ... list of states ... keep yours */}
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Enugu">Enugu</option>
          {/* add all others as you had before */}
        </select>

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required disabled={loading} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required disabled={loading} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required disabled={loading} />

        <input type="text" name="referralCode" placeholder="Referral Code (optional)" value={form.referralCode} onChange={handleChange} disabled={loading} />

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
