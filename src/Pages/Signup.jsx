// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import API from "../axios"; // keep this, no need for .js

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
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
      setMessage({ type: "error", text: "Password must be at least 8 characters long." });
      setLoading(false);
      return;
    }

    if (parseInt(form.age) < 18) {
      setMessage({ type: "error", text: "You must be at least 18 years old." });
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setLoading(false);
      return;
    }

    try {
      await API.post("/auth/signup", form);
      setMessage({ type: "success", text: "Signup successful! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage({ type: "error", text: "Error signing up. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required disabled={loading} />

        <select name="state" value={form.state} onChange={handleChange} required disabled={loading}>
          <option value="">Select State</option>
          {["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
            "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
            "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
            "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
            "Taraba","Yobe","Zamfara"
          ].map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required disabled={loading} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required disabled={loading} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required disabled={loading} />

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
