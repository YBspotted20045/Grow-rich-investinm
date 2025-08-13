// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [investmentTier, setInvestmentTier] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [firstWithdrawalDone, setFirstWithdrawalDone] = useState(false);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Updated backend URL
  const API_BASE = process.env.REACT_APP_API_URL || 'https://grow-0nfm.onrender.com';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(storedUser);
    fetchUserData(storedUser);
  }, [navigate]);

  const fetchUserData = async (currentUser) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Fetch coin balance and investment data
      const balanceRes = await fetch(`${API_BASE}/api/coins/my`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (balanceRes.ok) {
        const data = await balanceRes.json();
        setCoins(data.balance || 0);
        setInvestmentTier(data.investmentTier || currentUser.investmentTier || null);
        setReferralCount(data.referralCount || currentUser.referralCount || 0);
        setFirstWithdrawalDone(data.firstWithdrawalDone || currentUser.firstWithdrawalDone || false);
        setReferralCode(data.referralCode || currentUser.referralCode || '');
      }

      // Fetch withdrawal eligibility
      const eligibilityRes = await fetch(`${API_BASE}/api/coins/eligibility`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (eligibilityRes.ok) {
        const eligibilityData = await eligibilityRes.json();
        setEligibility(eligibilityData);
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || user?.email} 👋</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-grid">
        
        {/* Coin Balance */}
        <div className="card">
          <h3>💰 Your Mimi Coins</h3>
          <p className="balance">{coins}</p>
        </div>

        {/* Investment Tier */}
        <div className="card">
          <h3>📊 Investment Tier</h3>
          <p className="tier">
            {investmentTier ? `₦${investmentTier.toLocaleString()}` : 'Not set'}
          </p>
        </div>

        {/* Referral Count */}
        <div className="card">
          <h3>👥 Referrals Made</h3>
          <p className="count">{referralCount} / {firstWithdrawalDone ? '1' : '2'}</p>
        </div>

        {/* Referral Code */}
        <div className="card">
          <h3>🔗 Your Referral Code</h3>
          <p className="referral-code">{referralCode || 'Not available'}</p>
        </div>

        {/* Withdrawal Eligibility */}
        <div className="card">
          <h3>✅ Withdrawal Eligibility</h3>
          {eligibility ? (
            eligibility.eligible ? (
              <p className="eligible">You are eligible to withdraw 🎉</p>
            ) : (
              <p className="not-eligible">Not eligible yet — {eligibility.reason}</p>
            )
          ) : (
            <p>Loading eligibility...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
