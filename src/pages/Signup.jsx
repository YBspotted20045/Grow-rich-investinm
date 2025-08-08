import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    state: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
    "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const validate = () => {
    let temp = {};
    if (!formData.fullName) temp.fullName = "Full name is required";
    if (!formData.age || formData.age < 18) temp.age = "You must be at least 18 years old";
    if (!formData.state) temp.state = "Please select your state";
    if (!formData.email) temp.email = "Email is required";
    if (!formData.password || formData.password.length < 8)
      temp.password = "Password must be at least 8 characters";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await API.post("/auth/signup", formData);
      alert("Sign-up successful! Please login.");
    } catch (err) {
      alert("Error signing up: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      {/* Moving background logos */}
      <div className="background-animation">
        <img src="/logo.png" alt="Floating logo" className="floating-logo small" />
        <img src="/logo.png" alt="Floating logo" className="floating-logo medium" />
      </div>

      {/* Dark overlay */}
      <div className="dark-overlay"></div>

      <div className="signup-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Select State --</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="error">{errors.state}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
