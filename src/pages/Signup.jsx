import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../axios"; // centralized axios instance
import ParticlesBackground from "./ParticlesBackground"; // optional animated background component

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [referralStatus, setReferralStatus] = useState(null); // null, "valid", "invalid"
  const [referralMessage, setReferralMessage] = useState("");

  // Debounced referral code validation
  useEffect(() => {
    const timer = setTimeout(() => {
      const code = formData.referralCode.trim().toUpperCase();
      if (code.length > 0) {
        API.get(`/referral/check/${code}`)
          .then((res) => {
            if (res.data.valid) {
              setReferralStatus("valid");
              setReferralMessage("Referral code is valid!");
            } else {
              setReferralStatus("invalid");
              setReferralMessage("Referral code is invalid.");
            }
          })
          .catch(() => {
            setReferralStatus("invalid");
            setReferralMessage("Error validating referral code.");
          });
      } else {
        setReferralStatus(null);
        setReferralMessage("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.referralCode]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "referralCode" ? value.toUpperCase() : value,
    }));
  };

  // Validate form before submit
  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.state.trim()) errs.state = "State is required.";
    if (!formData.age || parseInt(formData.age) < 18)
      errs.age = "You must be at least 18 years old.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Invalid email address.";
    if (!formData.password || formData.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    if (formData.referralCode && referralStatus === "invalid")
      errs.referralCode = "Invalid referral code.";
    return errs;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await API.post("/signup", formData);
      if (res.data.success) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Network error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <ParticlesBackground />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Referral Code */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Referral Code (optional)</label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              referralStatus === "invalid"
                ? "border-red-500"
                : referralStatus === "valid"
                ? "border-green-500"
                : "border-gray-300"
            }`}
          />
          {referralMessage && (
            <p
              className={`text-sm mt-1 ${
                referralStatus === "valid" ? "text-green-600" : "text-red-500"
              }`}
            >
              {referralMessage}
            </p>
          )}
          {errors.referralCode && (
            <p className="text-red-500 text-sm mt-1">{errors.referralCode}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded font-semibold mt-4"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
