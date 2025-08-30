import React, { useState } from "react";
import "./Signup.css";
import API from "../axios";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (parseInt(form.age) < 18) {
      alert("You must be at least 18 years old.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
    } catch (error) {
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <select name="state" value={form.state} onChange={handleChange} required>
          <option value="">Select State</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Enugu">Enugu</option>
          <option value="Anambra">Anambra</option>
          <option value="Rivers">Rivers</option>
          <option value="Kano">Kano</option>
          <!-- add other states -->
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
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
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
