// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    state: ""
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success or error

  const statesList = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);
      if (res.data.success) {
        setMessage("Your account has been created successfully!");
        setMessageType("success");
        localStorage.setItem("token", res.data.token);

        setTimeout(() => {
          setMessage("");
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="signup-container">
      {message && (
        <div
          className={`popup-message ${messageType}`}
          style={{
            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
            padding: "10px 20px",
            borderRadius: "8px",
            textAlign: "center",
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Account</h2>

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
          placeholder="Email Address"
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
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {statesList.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
