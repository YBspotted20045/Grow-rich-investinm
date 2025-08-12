// src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [investmentTier, setInvestmentTier] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || 'https://your-render-backend.onrender.com';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!token || !storedUser) {
          window.location.href = '/login';
          return;
        }

        // Fetch user's coin balance and investment data
        const response = await fetch(`${API_BASE}/api/coins/my`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCoins(data.balance || 0);
          
          // Update user state with combined data
          setUser({
            ...storedUser,
            name: storedUser.name,
            email: storedUser.email
          });
          
          // Set investment data
          setInvestmentTier(data.investmentTier || storedUser.investmentTier || null);
          setReferralCount(data.referralCount || storedUser.referralCount || 0);
          setReferralCode(data.referralCode || storedUser.referralCode || '');
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Profile error:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [API_BASE]);

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      alert(`Your referral code "${referralCode}" has been copied!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
          
          {/* Header */}
          <div className="bg-green-600 text-white p-6">
            <h1 className="text-3xl font-bold">👤 Your Profile</h1>
            <p className="opacity-90">Manage your investment information</p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Personal Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg">{user?.name || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{user?.email || 'Not set'}</p>
                </div>
              </div>

              {/* Investment Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Investment Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Mimi Coins Balance</label>
                  <p className="text-2xl font-bold text-green-600">{coins}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Investment Tier</label>
                  <p className="text-lg">
                    {investmentTier ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        ₦{investmentTier.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Referrals Made</label>
                  <p className="text-lg">{referralCount}</p>
                </div>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🔗 Your Referral Code</h2>
              
              {referralCode ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600">Share this code</label>
                    <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-3 font-mono text-lg text-center">
                      {referralCode}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyReferralCode}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 whitespace-nowrap"
                  >
                    Copy Code
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">
                  Your referral code will be available after your first investment.
                </p>
              )}

              <p className="mt-3 text-sm text-gray-600">
                When someone signs up using your code, they'll be linked to you as their referrer.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
