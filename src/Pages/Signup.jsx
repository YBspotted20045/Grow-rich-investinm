import React, { useState } from "react";
import API from "../axios"; // centralized Axios instance

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const statesList = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
    "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    if (Number(age) < 18) {
      alert("You must be at least 18 years old!");
      return;
    }

    setSubmitting(true);

    try {
      const response = await API.post("/auth/signup", {
        fullName,
        email,
        password,
        age,
        state,
        referralCode
      });
      console.log("Signup successful:", response.data);
      // redirect to login or show success
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      // show error to user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={submitting}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          required
        />
        {/* OTP can be added later */}
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={submitting}
          required
        />
        <input
          type="number"
          placeholder="Age (min 18)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={submitting}
          required
        />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={submitting}
          required
        >
          <option value="">Select State</option>
          {statesList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Signing up..." : "Sign Up"}
        </button>

        {/* Link to Login page */}
        <p>
          Already have an account?{" "}
          <a href="/login" className="link">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
