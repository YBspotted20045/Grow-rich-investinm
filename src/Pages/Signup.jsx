import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    // ✅ Here you will later connect API request for signup
  };

  return (
    <div className="signup-container">
      <img src="/logo.png" alt="GrowRich Investments" className="logo" />
      <h2>Create Account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select state</option>
          {/* ✅ already complete list of 36 states + FCT */}
          <option value="Abia - Umuahia">Abia - Umuahia</option>
          <option value="Adamawa - Yola">Adamawa - Yola</option>
          <option value="Akwa Ibom - Uyo">Akwa Ibom - Uyo</option>
          <option value="Anambra - Awka">Anambra - Awka</option>
          <option value="Bauchi - Bauchi">Bauchi - Bauchi</option>
          <option value="Bayelsa - Yenagoa">Bayelsa - Yenagoa</option>
          <option value="Benue - Makurdi">Benue - Makurdi</option>
          <option value="Borno - Maiduguri">Borno - Maiduguri</option>
          <option value="Cross River - Calabar">Cross River - Calabar</option>
          <option value="Delta - Asaba">Delta - Asaba</option>
          <option value="Ebonyi - Abakaliki">Ebonyi - Abakaliki</option>
          <option value="Edo - Benin City">Edo - Benin City</option>
          <option value="Ekiti - Ado-Ekiti">Ekiti - Ado-Ekiti</option>
          <option value="Enugu - Enugu">Enugu - Enugu</option>
          <option value="Gombe - Gombe">Gombe - Gombe</option>
          <option value="Imo - Owerri">Imo - Owerri</option>
          <option value="Jigawa - Dutse">Jigawa - Dutse</option>
          <option value="Kaduna - Kaduna">Kaduna - Kaduna</option>
          <option value="Kano - Kano">Kano - Kano</option>
          <option value="Katsina - Katsina">Katsina - Katsina</option>
          <option value="Kebbi - Birnin Kebbi">Kebbi - Birnin Kebbi</option>
          <option value="Kogi - Lokoja">Kogi - Lokoja</option>
          <option value="Kwara - Ilorin">Kwara - Ilorin</option>
          <option value="Lagos - Ikeja">Lagos - Ikeja</option>
          <option value="Nasarawa - Lafia">Nasarawa - Lafia</option>
          <option value="Niger - Minna">Niger - Minna</option>
          <option value="Ogun - Abeokuta">Ogun - Abeokuta</option>
          <option value="Ondo - Akure">Ondo - Akure</option>
          <option value="Osun - Osogbo">Osun - Osogbo</option>
          <option value="Oyo - Ibadan">Oyo - Ibadan</option>
          <option value="Plateau - Jos">Plateau - Jos</option>
          <option value="Rivers - Port Harcourt">Rivers - Port Harcourt</option>
          <option value="Sokoto - Sokoto">Sokoto - Sokoto</option>
          <option value="Taraba - Jalingo">Taraba - Jalingo</option>
          <option value="Yobe - Damaturu">Yobe - Damaturu</option>
          <option value="Zamfara - Gusau">Zamfara - Gusau</option>
          <option value="FCT - Abuja">FCT - Abuja</option>
        </select>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (Optional)"
          value={formData.referralCode}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p className="link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
