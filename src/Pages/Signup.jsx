// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css"; // Your existing CSS
import logo from "../assets/logo.png"; // Your logo

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      setSubmitting(false);
      return;
    }

    if (parseInt(formData.age) < 18) {
      alert("You must be at least 18 years old");
      setSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setSubmitting(false);
      return;
    }

    // TODO: API call for signup
    console.log("Signup data:", formData);
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <img
        src={logo}
        alt="Logo"
        className="animated-logo"
        style={{ animation: "spin 5s linear infinite" }}
      />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          <option value="">Select Your State</option>
          <option value="Abia">Abia</option>
          <option value="Adamawa">Adamawa</option>
          <option value="Akwa Ibom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
          <option value="Delta">Delta</option>
          <option value="Ebonyi">Ebonyi</option>
          <option value="Edo">Edo</option>
          <option value="Ekiti">Ekiti</option>
          <option value="Enugu">Enugu</option>
          <option value="FCT">FCT</option>
          <option value="Gombe">Gombe</option>
          <option value="Imo">Imo</option>
          <option value="Jigawa">Jigawa</option>
          <option value="Kaduna">Kaduna</option>
          <option value="Kano">Kano</option>
          <option value="Katsina">Katsina</option>
          <option value="Kebbi">Kebbi</option>
          <option value="Kogi">Kogi</option>
          <option value="Kwara">Kwara</option>
          <option value="Lagos">Lagos</option>
          <option value="Nasarawa">Nasarawa</option>
          <option value="Niger">Niger</option>
          <option value="Ogun">Ogun</option>
          <option value="Ondo">Ondo</option>
          <option value="Osun">Osun</option>
          <option value="Oyo">Oyo</option>
          <option value="Plateau">Plateau</option>
          <option value="Rivers">Rivers</option>
          <option value="Sokoto">Sokoto</option>
          <option value="Taraba">Taraba</option>
          <option value="Yobe">Yobe</option>
          <option value="Zamfara">Zamfara</option>
        </select>
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          value={formData.referralCode}
          onChange={handleChange}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
