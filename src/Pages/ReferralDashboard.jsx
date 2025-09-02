import React, { useEffect, useState } from "react";
import API from "../axios";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await API.get("/referrals");
        setReferrals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReferrals();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gold mb-6">Your Referrals</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-2xl overflow-hidden">
          <thead className="bg-gold text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Investment</th>
            </tr>
          </thead>
          <tbody>
            {referrals.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No referrals yet
                </td>
              </tr>
            ) : (
              referrals.map((ref, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{ref.name}</td>
                  <td className="px-4 py-2">{ref.email}</td>
                  <td className="px-4 py-2">₦{ref.investment}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referrals;
