import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import "./Referrals.css";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);

  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token"); // User token
      const res = await axios.get("/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReferrals(res.data.referrals);
    } catch (err) {
      console.error("Fetch referrals error:", err);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <div className="referrals-container">
      <h1>My Referrals</h1>
      {referrals.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
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
                <td>₦{ref.investmentAmount}</td>
                <td>{new Date(ref.investmentDate).toLocaleDateString()}</td>
                <td>{new Date(ref.maturityDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Referrals;
