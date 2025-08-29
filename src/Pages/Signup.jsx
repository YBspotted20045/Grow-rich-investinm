// src/pages/Signup.jsx
import React, { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (parseInt(formData.age) < 18) {
      return setError("You must be at least 18 years old.");
    }

    try {
      setLoading(true);
      await API.post("/auth/register", formData);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-2xl p-8 border border-yellow-500">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6 animate-pulse">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />

          {/* State Dropdown */}
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">-- Select State --</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
            }
