import React, { useState } from "react";  
import "./Signup.css";  
import API from "../axios";  
  
function Signup() {  
  const [form, setForm] = useState({  
    fullName: "",  
    state: "",  
    email: "",  
    password: "",  
    confirmPassword: "",  
    age: "",  
  });  
  
  const handleChange = (e) => {  
    setForm({ ...form, [e.target.name]: e.target.value });  
  };  
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
  
    if (form.password.length < 8) {  
      alert("Password must be at least 8 characters long.");  
      return;  
    }  
  
    if (parseInt(form.age) < 18) {  
      alert("You must be at least 18 years old.");  
      return;  
    }  
  
    if (form.password !== form.confirmPassword) {  
      alert("Passwords do not match.");  
      return;  
    }  
  
    try {  
      await API.post("/auth/signup", form);  
      alert("Signup successful! Please login.");  
    } catch (error) {  
      alert("Error signing up. Please try again.");  
    }  
  };  
  
  return (  
    <div className="signup-container">  
      <form className="signup-form" onSubmit={handleSubmit}>  
        <h2>Create Account</h2>  
        <input  
          type="text"  
          name="fullName"  
          placeholder="Full Name"  
          value={form.fullName}  
          onChange={handleChange}  
          required  
        />  
  
        <select name="state" value={form.state} onChange={handleChange} required>  
          <option value="">Select State</option>  
          <option value="Abia">Abia</option>  
          <option value="Adamawa">Adamawa</option>  
          <option value="Akwa Ibom">Akwa Ibom</option>  
          <option value="Anambra">Anambra</option>  
          <option value="Bauchi">Bauchi</option>  
          <option value="Bayelsa">Bayelsa</option>  
          <option value="Benue">Benue</option>  
          <option value="Borno">Borno</option>  
          <option value="Cross River">Cross River</option>  
          <option value="Delta">Delta</option>  
          <option value="Ebonyi">Ebonyi</option>  
          <option value="Edo">Edo</option>  
          <option value="Ekiti">Ekiti</option>  
          <option value="Enugu">Enugu</option>  
          <option value="FCT - Abuja">FCT - Abuja</option>  
          <option value="Gombe">Gombe</option>  
          <option value="Imo">Imo</option>  
          <option value="Jigawa">Jigawa</option>  
          <option value="Kaduna">Kaduna</option>  
          <option value="Kano">Kano</option>  
          <option value="Katsina">Katsina</option>  
          <option value="Kebbi">Kebbi</option>  
          <option value="Kogi">Kogi</option>  
          <option value="Kwara">Kwara</option>  
          <option value="Lagos">Lagos</option>  
          <option value="Nasarawa">Nasarawa</option>  
          <option value="Niger">Niger</option>  
          <option value="Ogun">Ogun</option>  
          <option value="Ondo">Ondo</option>  
          <option value="Osun">Osun</option>  
          <option value="Oyo">Oyo</option>  
          <option value="Plateau">Plateau</option>  
          <option value="Rivers">Rivers</option>  
          <option value="Sokoto">Sokoto</option>  
          <option value="Taraba">Taraba</option>  
          <option value="Yobe">Yobe</option>  
          <option value="Zamfara">Zamfara</option>  
        </select>  
  
        <input  
          type="email"  
          name="email"  
          placeholder="Email"  
          value={form.email}  
          onChange={handleChange}  
          required  
        />  
        <input  
          type="password"  
          name="password"  
          placeholder="Password"  
          value={form.password}  
          onChange={handleChange}  
          required  
        />  
        <input  
          type="password"  
          name="confirmPassword"  
          placeholder="Confirm Password"  
          value={form.confirmPassword}  
          onChange={handleChange}  
          required  
        />  
        <input  
          type="number"  
          name="age"  
          placeholder="Age"  
          value={form.age}  
          onChange={handleChange}  
          required  
        />  
        <button type="submit">Sign Up</button>  
      </form>  
    </div>  
  );  
}  
  
export default Signup;
