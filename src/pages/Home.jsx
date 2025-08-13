// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          'https://grow-0nfm.onrender.com/api/users/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center", 
      maxWidth: "800px", 
      margin: "0 auto", 
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6"
    }}>
      <h1 style={{ color: "#28a745", marginBottom: "1rem" }}>
        {loading
          ? "Loading..."
          : user
          ? `Welcome, ${user.name}!`
          : "Welcome to GrowRich Investments"}
      </h1>
      
      <p style={{ fontSize: "18px", color: "#333", marginBottom: "2rem" }}>
        {user
          ? `You're now logged in and ready to grow your wealth with Mimi Coins. Your investment tier: ${user.investmentTier || 'Not set yet'}.`
          : "Thank you for joining our investment community!"}
      </p>

      <div style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "2rem"
      }}>
        <h2 style={{ color: "#333", marginTop: 0 }}>🚀 What's Next?</h2>
        <ul style={{ textAlign: "left", display: "inline-block", margin: "15px 0" }}>
          <li>✅ Complete your investment payment</li>
          <li>📤 Upload your payment receipt</li>
          <li>👥 Invite others using your referral code</li>
          <li>💰 Earn Mimi Coins and start withdrawing</li>
        </ul>
      </div>

      <Link 
        to="/dashboard" 
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          display: "inline-block",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
