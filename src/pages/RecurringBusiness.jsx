// src/pages/RecurringBusiness.jsx

import React from 'react';

const RecurringBusiness = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">📊 Investment & Referral System</h1>
            <p className="text-gray-600">How the Mimi Coin investment and withdrawal system works</p>
          </div>

          {/* Investment Tiers */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">💰 Investment Packages</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800">10 Mimi Coins</h3>
                <p className="text-gray-700">₦10,000 Investment</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800">15 Mimi Coins</h3>
                <p className="text-gray-700">₦15,000 Investment</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-bold text-purple-800">20 Mimi Coins</h3>
                <p className="text-gray-700">₦20,000 Investment</p>
              </div>
            </div>
          </section>

          {/* Referral Rules */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">👥 Referral Rules</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>₦10,000 Investors:</strong> Can refer <span className="font-semibold text-green-600">anyone</span> (10k, 15k, or 20k)</li>
              <li><strong>₦15,000 Investors:</strong> Can refer <span className="font-semibold text-blue-600">₦10,000 or ₦15,000</span> investors</li>
              <li><strong>₦20,000 Investors:</strong> Can only refer <span className="font-semibold text-purple-600">₦20,000</span> investors</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> When someone signs up using your referral code, they become your referral automatically.
              </p>
            </div>
          </section>

          {/* Withdrawal Rules */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">✅ Withdrawal Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800">First Withdrawal</h3>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>Wait <strong>12 days</strong> after investment</li>
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
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">🔄 How the System Works</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Pay the vendor and get your receipt</li>
              <li>Upload receipt in the app</li>
              <li>Admin verifies and credits your Mimi Coins</li>
              <li>Refer new investors using your referral code</li>
              <li>After 12 days and 2 referrals, request your first withdrawal</li>
              <li>Continue referring to earn more and withdraw regularly</li>
            </ol>
          </section>

          {/* Status Check Reminder */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 text-center">
              <strong>Check your status:</strong> Visit your Dashboard to see if you're eligible for withdrawal.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecurringBusiness;
