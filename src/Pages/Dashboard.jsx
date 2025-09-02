import React, { useEffect, useState } from "react";
import API from "../axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gold mb-6">
        Welcome, {user.name}
      </h1>

      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Investment</h2>
        <p className="text-gray-600">
          <strong>Amount:</strong> ₦{user.investmentAmount || 0}
        </p>
        <p className="text-gray-600">
          <strong>Return:</strong> ₦{user.expectedReturn || 0}
        </p>
        <p className="text-gray-600">
          <strong>Maturity Date:</strong> {user.maturityDate || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
