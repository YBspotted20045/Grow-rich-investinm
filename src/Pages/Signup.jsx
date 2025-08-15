// src/pages/Signup.jsx
import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    state: "",
    referralCode: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState("");

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi",
    "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
    "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
    "Yobe", "Zamfara", "FCT Abuja"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");

    // Validations
    if (formData.fullName.trim() === "") {
      setErrors("Full Name is required.");
      return;
    }
    if (!formData.email.includes("@")) {
      setErrors("Valid Email is required.");
      return;
    }
    if (formData.password.length < 8) {
      setErrors("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }
    if (Number(formData.age) < 18) {
      setErrors("You must be at least 18 years old.");
      return;
    }
    if (!formData.state) {
      setErrors("Please select your state.");
      return;
    }

    // If all validations pass
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert("Registration successful!");
      setSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        state: "",
        referralCode: "",
      });
    }, 1500);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errors && <p className="error">{errors}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          disabled={submitting}
          required
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          disabled={submitting}
          required
        >
          <option value="">Select State</option>
          {states.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (optional)"
          value={formData.referralCode}
          onChange={handleChange}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
<p>
  Already have an account?{" "}
  <a href="/login" className="link">
    Login here
  </a>
</p>
export default Signup;
