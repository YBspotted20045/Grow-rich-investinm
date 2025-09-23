// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios"; // centralized axios instance
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const states = [
  { name: "Abia", capital: "Umuahia" },
  { name: "Adamawa", capital: "Yola" },
  { name: "Akwa Ibom", capital: "Uyo" },
  { name: "Anambra", capital: "Awka" },
  { name: "Bauchi", capital: "Bauchi" },
  { name: "Bayelsa", capital: "Yenagoa" },
  { name: "Benue", capital: "Makurdi" },
  { name: "Borno", capital: "Maiduguri" },
  { name: "Cross River", capital: "Calabar" },
  { name: "Delta", capital: "Asaba" },
  { name: "Ebonyi", capital: "Abakaliki" },
  { name: "Edo", capital: "Benin City" },
  { name: "Ekiti", capital: "Ado-Ekiti" },
  { name: "Enugu", capital: "Enugu" },
  { name: "Gombe", capital: "Gombe" },
  { name: "Imo", capital: "Owerri" },
  { name: "Jigawa", capital: "Dutse" },
  { name: "Kaduna", capital: "Kaduna" },
  { name: "Kano", capital: "Kano" },
  { name: "Katsina", capital: "Katsina" },
  { name: "Kebbi", capital: "Birnin Kebbi" },
  { name: "Kogi", capital: "Lokoja" },
  { name: "Kwara", capital: "Ilorin" },
  { name: "Lagos", capital: "Ikeja" },
  { name: "Nasarawa", capital: "Lafia" },
  { name: "Niger", capital: "Minna" },
  { name: "Ogun", capital: "Abeokuta" },
  { name: "Ondo", capital: "Akure" },
  { name: "Osun", capital: "Oshogbo" },
  { name: "Oyo", capital: "Ibadan" },
  { name: "Plateau", capital: "Jos" },
  { name: "Rivers", capital: "Port Harcourt" },
  { name: "Sokoto", capital: "Sokoto" },
  { name: "Taraba", capital: "Jalingo" },
  { name: "Yobe", capital: "Damaturu" },
  { name: "Zamfara", capital: "Gusau" },
  { name: "FCT", capital: "Abuja" }
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    referralCode: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const { data } = await API.post("/auth/signup", {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        state: formData.state,
        referredBy: formData.referralCode
      });

      if (data.success) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <label className="block mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select your state</option>
            {states.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name} ({s.capital})
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Referral Code (optional)"
          name="referralCode"
          type="text"
          value={formData.referralCode}
          onChange={handleChange}
        />

        {/* Terms & Conditions will be added later */}

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;
