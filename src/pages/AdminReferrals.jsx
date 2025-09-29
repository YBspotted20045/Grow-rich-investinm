// src/pages/AdminReferrals.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios.js"; // ✅ centralized axios instance
import "./AdminReferrals.css"; // you can style this later

const AdminReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token"); // use same token as admin login
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const res = await axios.get("/admin/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReferrals(res.data.referrals || []);
    } catch (err) {
      console.error("Fetch referrals error:", err);
      setError(err.response?.data?.message || "Failed to fetch referrals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  if (loading) return <p>Loading referrals...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-referrals-container">
      <h1>Manage Referrals</h1>
      {referrals.length === 0 ? (
        <p>No referrals found.</p>
      ) : (
        <table className="referrals-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Referred Users</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref) => (
              <tr key={ref.userId}>
                <td>{ref.username}</td>
                <td>{ref.email}</td>
                <td>
                  {ref.referrals.length > 0 ? (
                    <ul>
                      {ref.referrals.map((r) => (
                        <li key={r.id}>
                          {r.username} ({r.email})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No referrals"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReferrals;
