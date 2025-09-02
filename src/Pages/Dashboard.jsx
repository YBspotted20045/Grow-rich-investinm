import React, { useEffect, useState } from "react";
import API from "../axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        // Some backends return user under res.data.user, some under res.data
        setUser(res.data.user || res.data);
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
        Welcome, {user.name || "Investor"}
      </h1>

      {/* Investment Summary */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Investment
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Amount:</strong> ₦{user.investmentAmount || 0}
          </p>
          <p>
            <strong>Return:</strong> ₦{user.expectedReturn || 0}
          </p>
          <p>
            <strong>Maturity Date:</strong> {user.maturityDate || "N/A"}
          </p>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Referrals
        </h2>
        {user.referrals && user.referrals.length > 0 ? (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Investment</th>
              </tr>
            </thead>
            <tbody>
              {user.referrals.map((ref, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-2">{ref.name}</td>
                  <td className="p-2">{ref.email}</td>
                  <td className="p-2">₦{ref.investmentAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No referrals yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
