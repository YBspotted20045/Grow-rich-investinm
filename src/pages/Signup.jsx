import React, { useState } from "react";
import "./Signup.css";
import axios from "../axios";

const statesInNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = "Full name is required (min 2 characters).";
    }
    if (!formData.state) {
      newErrors.state = "Please select your state.";
    }
    if (!formData.age || isNaN(formData.age) || Number(formData.age) < 18) {
      newErrors.age = "Age must be a number and at least 18.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/signup", formData);
      alert("Signup successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-container">
        <img src="/logo.png" alt="GrowRich Logo" className="floating-logo" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Select State</option>
          {statesInNigeria.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="error">{errors.state}</span>}

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span className="error">{errors.age}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
          }
