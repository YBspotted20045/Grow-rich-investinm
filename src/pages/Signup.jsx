import React, { useState, useEffect } from "react";
import API from "../axios";

const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara",
  "Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers",
  "Sokoto","Taraba","Yobe","Zamfara"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    otp: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!formData.email) return setError("Email is required");
    try {
      await API.post("/auth/send-otp", { email: formData.email });
      setOtpSent(true);
      setTimer(60);
      setMessage("OTP sent! Check your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (timer === 0) {
      setError("OTP expired! Please resend.");
      return;
    }
    try {
      await API.post("/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });
      setOtpVerified(true);
      setMessage("OTP verified! You can now complete signup.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const register = async () => {
    if (!formData.fullName || !formData.email || !formData.state || !formData.password || !formData.confirmPassword) {
      return setError("All fields are required");
    }
    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      await API.post("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        state: formData.state
      });
      setMessage("Registration successful!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      {!otpSent && (
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {states.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {otpSent && !otpVerified && (
        <div>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
          />
          <button onClick={verifyOtp} disabled={timer === 0}>Verify OTP</button>
          <div>
            {timer > 0 ? (
              <span>OTP expires in {timer}s</span>
            ) : (
              <button onClick={sendOtp}>Resend OTP</button>
            )}
          </div>
        </div>
      )}

      {otpVerified && (
        <div>
          <button onClick={register}>Complete Signup</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Signup;
