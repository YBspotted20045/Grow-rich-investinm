import React, { useState, useEffect } from "react";
import API from "./axios"; // Your centralized Axios instance

const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa",
  "Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti",
  "Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi",
  "Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun",
  "Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT"
];

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    state: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [message, setMessage] = useState("");

  // OTP countdown timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.email) return setMessage("Enter your email to receive OTP");
    try {
      await API.post("/send-otp", { email: form.email });
      setOtpSent(true);
      setOtpTimer(120); // 2 minutes countdown
      setMessage("OTP sent! Check your email.");
    } catch (err) {
      setMessage("Error sending OTP. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8 || form.confirmPassword.length < 8)
      return setMessage("Password must be at least 8 characters");

    if (form.password !== form.confirmPassword)
      return setMessage("Passwords do not match");

    if (!otpSent || otpTimer <= 0)
      return setMessage("Please verify your OTP first");

    try {
      const res = await API.post("/signup", form);
      setMessage(res.data.message || "Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
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
        <div className="otp-section">
          <button type="button" onClick={sendOtp} disabled={otpTimer > 0}>
            {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
          </button>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
