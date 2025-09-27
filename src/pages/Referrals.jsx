// src/pages/Referrals.jsx
import React, { useEffect, useState } from "react";
import API from "./axios";
import "./Referrals.css";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);

  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReferrals(res.data.referrals || []);
    } catch (err) {
      console.error("Fetch referrals error:", err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <div className="referrals-container">
      <h1 className="referrals-title">My Referrals</h1>

      {referrals.length === 0 ? (
        <p className="no-referrals">⚠️ No referrals yet.</p>
      ) : (
        <div className="referrals-card">
          <table className="referrals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Investment Amount</th>
                <th>Investment Date</th>
                <th>Maturity Date</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref._id}>
                  <td>{ref.username}</td>
                  <td>{ref.email}</td>
                  <td>₦{ref.investmentAmount.toLocaleString()}</td>
                  <td>{new Date(ref.investmentDate).toLocaleDateString()}</td>
                  <td>{new Date(ref.maturityDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Referrals;
