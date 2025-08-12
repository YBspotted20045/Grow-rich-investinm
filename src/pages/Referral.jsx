// src/pages/Referral.jsx

import React, { useState, useEffect } from 'react';

const Referral = () => {
  const [user, setUser] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);

  // Get API URL from environment or use default
  const API_BASE = process.env.REACT_APP_API_URL || 'https://your-render-backend.onrender.com';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!token || !storedUser) {
          return;
        }

        // Fetch user's referral code from backend
        const response = await fetch(`${API_BASE}/api/coins/my`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(storedUser);
          setReferralCode(data.referralCode || '');
        }
      } catch (err) {
        console.error('Error fetching referral data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [API_BASE]);

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      alert(`Your referral code "${referralCode}" has been copied!`);
    }
  };

  const handleCopyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert(`Your referral link has been copied!\n\n${referralLink}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading referral information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">👥 Referral System</h1>
            <p className="text-purple-600">Earn by inviting others to join GrowRich Investments</p>
          </div>

          {/* Your Referral Code */}
          {referralCode ? (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referral Code</h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 mb-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600">Share this code:</label>
                    <p className="text-2xl font-mono font-bold text-purple-700 text-center py-2 px-4 bg-white border border-purple-300 rounded">
                      {referralCode}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleCopyReferralCode}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      Copy Code
                    </button>
                    <button
                      onClick={handleCopyReferralLink}
                      className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center">
                When someone signs up using your code, they'll be automatically linked to you.
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="text-center text-gray-600">
                <svg className="w-12 h-12 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.84-1.29M9 14c0 2.21 1.79 4 4 4s4-1.79 4-4m-4 0c-2.21 0-4-1.79-4-4s1.79-4 4-4m0 0c2.21 0 4 1.79 4 4" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">No Referral Code Yet</h3>
                <p>Your referral code will be available after your first investment is approved.</p>
              </div>
            </div>
          )}

          {/* Referral Rules */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">📌 Referral Rules</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                <strong>₦10,000 Investors:</strong> Can refer <span className="font-semibold text-green-600">anyone</span> 
                (₦10k, ₦15k, or ₦20k investors)
              </li>
              <li>
                <strong>₦15,000 Investors:</strong> Can refer <span className="font-semibold text-blue-600">₦10,000 or ₦15,000</span> investors
              </li>
              <li>
                <strong>₦20,000 Investors:</strong> Can only refer <span className="font-semibold text-purple-600">₦20,000</span> investors
              </li>
            </ul>
          </div>

          {/* Withdrawal Requirements */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">✅ Withdrawal Requirements</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-gray-800">First Withdrawal</h3>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>Wait <strong>12 days</strong> after your investment</li>
                  <li>Refer <strong>2 new users</strong></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Subsequent Withdrawals</h3>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>Refer just <strong>1 new user</strong></li>
                  <li>No waiting period after first withdrawal</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">💳 Payment Information</h2>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-gray-800">
                <strong>Manual payment is done via PalmPay:</strong><br />
                <span className="font-semibold">Nnaji Kelvin Somtochukwu</span><br />
                <span className="font-mono">8984550866</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                After payment, upload your receipt in the app to get your Mimi Coins credited.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Referral;
