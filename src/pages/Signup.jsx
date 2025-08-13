// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
import { API } from "../axios"; // centralized axios instance
import "./Signup.css"; // keep your original styling

const statesList = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna",
  "Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun",
  "Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      setError("Please enter your email to receive OTP.");
      return;
    }
    try {
      await API.post("/send-otp", { email: form.email });
      setOtpSent(true);
      setCountdown(60); // 60-second OTP countdown
      setError("");
      setSuccess("OTP sent! Check your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    try {
      const response = await API.post("/signup", form);
      setSuccess(response.data.message || "Account created successfully!");
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        state: "",
        otp: "",
      });
      setOtpSent(false);
      setCountdown(0);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      {error && <div className="signup-error">{error}</div>}
      {success && <div className="signup-success">{success}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select your state</option>
          {statesList.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className="password-group">
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {otpSent && (
          <div className="otp-group">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              required
            />
            <span className="otp-countdown">{countdown > 0 ? `${countdown}s` : ""}</span>
          </div>
        )}
        {!otpSent && (
          <button type="button" className="otp-button" onClick={handleSendOtp}>
            Send OTP
          </button>
        )}
        <button type="submit" className="signup-submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
