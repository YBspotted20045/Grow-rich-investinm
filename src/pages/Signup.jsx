import React, { useState } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";

const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta",
  "Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina",
  "Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    referrerCode: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        state: form.state,
        referrerCode: form.referrerCode,
      });
      setMessage(res.data.message);
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        state: "",
        referrerCode: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {message && <p className="mb-4 text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <input
            type="text"
            name="referrerCode"
            placeholder="Referrer Code (optional)"
            value={form.referrerCode}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {/* Terms & Conditions placeholder */}
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
