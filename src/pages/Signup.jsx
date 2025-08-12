// src/pages/Signup.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const statesList = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano",
  "Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];

export default function Signup(){
  const [data, setData] = useState({
    fullName: "", 
    state: "", 
    age: "", 
    email: "", 
    password: "", 
    confirm: "",
    referralCode: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkingReferral, setCheckingReferral] = useState(false);
  const [referralInfo, setReferralInfo] = useState(null);
  const [referralError, setReferralError] = useState('');
  const navigate = useNavigate();

  // Get API URL from environment or use default
  const API_BASE = process.env.REACT_APP_API_URL || 'https://your-render-backend.onrender.com';

  // Check referral code in real-time
  useEffect(() => {
    const checkReferralCode = async () => {
      if (!data.referralCode || data.referralCode.length < 6) {
        setReferralInfo(null);
        setReferralError('');
        return;
      }

      setCheckingReferral(true);
      setReferralError('');
      
      try {
        const response = await fetch(`${API_BASE}/api/check-referral?code=${data.referralCode}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await response.json();

        if (result.valid) {
          setReferralInfo(result);
          setReferralError('');
        } else {
          setReferralInfo(null);
          setReferralError(result.message || 'Invalid referral code');
        }
      } catch (err) {
        setReferralInfo(null);
        setReferralError('Could not verify referral code. Please check your connection.');
      } finally {
        setCheckingReferral(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      if (data.referralCode) {
        checkReferralCode();
      } else {
        setReferralInfo(null);
        setReferralError('');
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [data.referralCode, API_BASE]);

  const validate = () => {
    const e = {};
    
    if (!data.fullName || data.fullName.trim().length < 2) e.fullName = "Enter full name";
    if (!data.state) e.state = "Choose your state";
    if (!data.age || Number(data.age) < 18) e.age = "You must be 18+";
    if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Enter a valid email";
    if (!data.password || data.password.length < 6) e.password = "Password must be 6+ chars";
    if (data.password !== data.confirm) e.confirm = "Passwords must match";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          referralCode: data.referralCode || undefined
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful! Please login to continue.");
        navigate("/login");
      } else {
        let errorMessage = result.message || 'Signup failed';
        
        // Handle specific error cases
        if (errorMessage.includes('Email already exists')) {
          setErrors({ email: 'This email is already registered' });
        } else if (errorMessage.includes('Invalid referral code')) {
          setErrors({ referralCode: 'Please enter a valid referral code' });
        } else {
          alert(errorMessage);
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lux-signup-page">
      <div className="lux-waves" />
      <div className="lux-particles">
        {[...Array(25)].map((_, i) => (
          <span 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              animationDuration: `${6 + Math.random()*8}s`,
              opacity: 0.15 + Math.random()*0.6
            }} 
          />
        ))}
      </div>

      <div className="top-logo">  
        <img src="/logo.png" alt="logo" className="top-logo-img" />  
        <div className="logo-sweep" />  
      </div>  

      <div className="moving-logos">  
        {[...Array(30)].map((_, i) => (  
          <img 
            key={i} 
            src="/logo.png" 
            alt="mini" 
            className="mini-logo" 
            style={{  
              left: `${Math.random()*100}%`,  
              top: `${Math.random()*100}%`,  
              animationDuration: `${8 + Math.random()*12}s`,  
              transform: `scale(${0.45 + Math.random()*0.95})`  
            }} 
          />  
        ))}  
      </div>  

      <div className="form-wrap">  
        <form className="lux-form" onSubmit={handleSubmit}>  
          <h2>Create account</h2>  

          <label>Full name</label>  
          <input 
            name="fullName" 
            value={data.fullName} 
            onChange={e => setData({...data, fullName: e.target.value})} 
            disabled={loading}
          />  
          {errors.fullName && <div className="form-error">{errors.fullName}</div>}  

          <label>State</label>  
          <select 
            name="state" 
            value={data.state} 
            onChange={e => setData({...data, state: e.target.value})} 
            disabled={loading}
          >  
            <option value="">Select state</option>  
            {statesList.map(s => <option key={s} value={s}>{s}</option>)}  
          </select>  
          {errors.state && <div className="form-error">{errors.state}</div>}  

          <label>Age</label>  
          <input 
            type="number" 
            name="age" 
            value={data.age} 
            onChange={e => setData({...data, age: e.target.value})} 
            disabled={loading}
          />  
          {errors.age && <div className="form-error">{errors.age}</div>}  

          <label>Email</label>  
          <input 
            type="email" 
            name="email" 
            value={data.email} 
            onChange={e => setData({...data, email: e.target.value})} 
            disabled={loading}
          />  
          {errors.email && <div className="form-error">{errors.email}</div>}  

          <label>Password</label>  
          <input 
            type="password" 
            name="password" 
            value={data.password} 
            onChange={e => setData({...data, password: e.target.value})} 
            disabled={loading}
          />  
          {errors.password && <div className="form-error">{errors.password}</div>}  

          <label>Confirm Password</label>  
          <input 
            type="password" 
            name="confirm" 
            value={data.confirm} 
            onChange={e => setData({...data, confirm: e.target.value})} 
            disabled={loading}
          />  
          {errors.confirm && <div className="form-error">{errors.confirm}</div>}  

          {/* Referral Code Field */}
          <label>Referral Code (Optional)</label>
          <input 
            name="referralCode" 
            value={data.referralCode} 
            onChange={e => setData({...data, referralCode: e.target.value.toUpperCase()})} 
            placeholder="e.g. MIMI1234"
            disabled={loading}
            style={{ 
              borderColor: referralError ? '#ff4d4d' : 
                        referralInfo ? '#28a745' : '' 
            }}
          />
          {checkingReferral && (
            <div style={{ color: '#007bff', fontSize: '12px', marginTop: '4px' }}>
              Checking referral code...
            </div>
          )}
          {referralInfo && !referralError && (
            <div style={{ color: '#28a745', fontSize: '12px', marginTop: '4px' }}>
              ✓ Referred by {referralInfo.name} ({referralInfo.referralCode})
            </div>
          )}
          {referralError && (
            <div className="form-error" style={{ fontSize: '12px', padding: '6px' }}>
              {referralError}
            </div>
          )}

          <button className="lux-btn" type="submit" disabled={loading}>  
            {loading ? <span className="spinner" /> : "Sign Up"}  
          </button>  

          <p className="switch">  
            Already have an account? <Link to="/login" className="link-gold">Login</Link>  
          </p>  
        </form>  
      </div>  
    </div>
  );
              }
