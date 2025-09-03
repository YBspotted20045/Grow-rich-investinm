 // src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../axios";
import "./Dashboard.css"; // optional custom styles

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <h1 className="text-2xl font-bold text-yellow-600">
        Welcome, {user.name}
      </h1>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-600">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Investment
          </h2>
          <p className="text-gray-600 text-sm">₦{user.investmentAmount || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-600">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Return</h2>
          <p className="text-gray-600 text-sm">₦{user.expectedReturn || 0}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-t-4 border-yellow-600">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Maturity Date
          </h2>
          <p className="text-gray-600 text-sm">{user.maturityDate || "N/A"}</p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-600">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Your Referral Code
        </h2>
        <p className="text-yellow-700 font-mono text-lg">
          {user.referralCode || "N/A"}
        </p>
      </div>

      {/* Eligibility */}
      <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-600">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Withdrawal Eligibility</h2>
        {user.isEligible ? (
          <p className="text-green-600 font-medium">✅ Eligible</p>
        ) : (
          <p className="text-red-600 font-medium">❌ Not Eligible</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
