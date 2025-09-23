import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchReferrals = async () => {
    try {
      const res = await axios.get("/users/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReferrals(res.data.referrals || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch referrals");
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Your Referrals</h1>

        {message && <p className="mb-4 text-red-600">{message}</p>}

        {referrals.length === 0 ? (
          <p>You have not referred any users yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Investment Amount</th>
                <th className="p-2 text-left">Investment Date</th>
                <th className="p-2 text-left">Maturity Date</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="p-2">{r.username}</td>
                  <td className="p-2">{r.email}</td>
                  <td className="p-2">₦{r.investmentAmount || 0}</td>
                  <td className="p-2">{r.investmentDate ? new Date(r.investmentDate).toLocaleDateString() : "-"}</td>
                  <td className="p-2">{r.maturityDate ? new Date(r.maturityDate).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Referrals;
