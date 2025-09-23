// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";

const nigeriaStates = [
  { state: "Abia", capital: "Umuahia" },
  { state: "Adamawa", capital: "Yola" },
  { state: "Akwa Ibom", capital: "Uyo" },
  { state: "Anambra", capital: "Awka" },
  { state: "Bauchi", capital: "Bauchi" },
  { state: "Bayelsa", capital: "Yenagoa" },
  { state: "Benue", capital: "Makurdi" },
  { state: "Borno", capital: "Maiduguri" },
  { state: "Cross River", capital: "Calabar" },
  { state: "Delta", capital: "Asaba" },
  { state: "Ebonyi", capital: "Abakaliki" },
  { state: "Edo", capital: "Benin City" },
  { state: "Ekiti", capital: "Ado-Ekiti" },
  { state: "Enugu", capital: "Enugu" },
  { state: "FCT", capital: "Abuja" },
  { state: "Gombe", capital: "Gombe" },
  { state: "Imo", capital: "Owerri" },
  { state: "Jigawa", capital: "Dutse" },
  { state: "Kaduna", capital: "Kaduna" },
  { state: "Kano", capital: "Kano" },
  { state: "Katsina", capital: "Katsina" },
  { state: "Kebbi", capital: "Birnin Kebbi" },
  { state: "Kogi", capital: "Lokoja" },
  { state: "Kwara", capital: "Ilorin" },
  { state: "Lagos", capital: "Ikeja" },
  { state: "Nasarawa", capital: "Lafia" },
  { state: "Niger", capital: "Minna" },
  { state: "Ogun", capital: "Abeokuta" },
  { state: "Ondo", capital: "Akure" },
  { state: "Osun", capital: "Oshogbo" },
  { state: "Oyo", capital: "Ibadan" },
  { state: "Plateau", capital: "Jos" },
  { state: "Rivers", capital: "Port Harcourt" },
  { state: "Sokoto", capital: "Sokoto" },
  { state: "Taraba", capital: "Jalingo" },
  { state: "Yobe", capital: "Damaturu" },
  { state: "Zamfara", capital: "Gusau" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    referralCode: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, terms } = formData;

    if (!terms) return alert("You must accept the terms and conditions.");
    if (password !== confirmPassword) return alert("Passwords do not match.");
    if (password.length < 8) return alert("Password must be at least 8 characters.");

    try {
      const { data } = await API.post("/auth/signup", formData);
      if (data.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select your state</option>
          {nigeriaStates.map((s, idx) => (
            <option key={idx} value={s.state}>
              {s.state} - {s.capital}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (optional)"
          value={formData.referralCode}
          onChange={handleChange}
        />
        <div>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />{" "}
          I accept the Terms & Conditions
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
