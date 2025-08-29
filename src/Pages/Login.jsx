// src/pages/Login.jsx
import React, { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await API.post("/auth/login", formData);
      setLoading(false);

      // Save token for authentication
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-2xl rounded-2xl p-8 border border-yellow-500">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6 animate-pulse">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-black border border-yellow-500 text-yellow-300 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
