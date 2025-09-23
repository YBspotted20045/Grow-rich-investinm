import React, { useState, useEffect } from "react";
import API from "../axios.js";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await API.get("/users/referrals", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReferrals(res.data.referrals || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch referrals.");
      }
    };
    fetchReferrals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Referrals</h1>
      {message && <p className="text-red-500">{message}</p>}
      {referrals.length > 0 ? (
        <ul className="list-disc pl-5">
          {referrals.map((ref) => (
            <li key={ref._id}>
              {ref.fullName} - {ref.email} - Invested: ₦{ref.investmentAmount || 0}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not referred anyone yet.</p>
      )}
    </div>
  );
};

export default Referrals;
