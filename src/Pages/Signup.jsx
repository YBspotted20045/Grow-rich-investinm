// Signup.jsx
import React, { useState } from "react";
import API from "./axios"; // Your centralized Axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    state: "",
    investmentPlan: "5000",
    referralCode: "",
    paymentProof: null,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const states = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
    "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
    "FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi",
    "Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun",
    "Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
  ];

  const investmentPlans = [
    { value: "5000", label: "₦5,000" },
    { value: "10000", label: "₦10,000" },
    { value: "15000", label: "₦15,000" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "paymentProof") {
      setFormData({ ...formData, paymentProof: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.age) newErrors.age = "Age is required";
    else if (Number(formData.age) < 18) newErrors.age = "You must be at least 18 years old";
    if (!formData.state) newErrors.state = "Please select a state";
    if (!formData.investmentPlan) newErrors.investmentPlan = "Select an investment plan";
    if (!formData.paymentProof) newErrors.paymentProof = "Please upload payment proof";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await API.post("/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMsg("Registration successful! Await admin confirmation.");
      setErrors({});
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        state: "",
        investmentPlan: "5000",
        referralCode: "",
        paymentProof: null,
      });
    } catch (err) {
      setErrors({ apiError: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="signup-container">
      <h2>Register for GrowRichInvestments</h2>
      {successMsg && <p className="success">{successMsg}</p>}
      {errors.apiError && <p className="error">{errors.apiError}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}

        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.state && <p className="error">{errors.state}</p>}

        <select name="investmentPlan" value={formData.investmentPlan} onChange={handleChange}>
          {investmentPlans.map((plan) => (
            <option key={plan.value} value={plan.value}>{plan.label}</option>
          ))}
        </select>
        {errors.investmentPlan && <p className="error">{errors.investmentPlan}</p>}

        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code (optional)"
          value={formData.referralCode}
          onChange={handleChange}
        />

        <input
          type="file"
          name="paymentProof"
          accept="image/*,application/pdf"
          onChange={handleChange}
        />
        {errors.paymentProof && <p className="error">{errors.paymentProof}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
