import React, { useEffect, useState } from "react";
import API from "./axios"; // ✅ centralized axios instance
import "./AdminReferrals.css";

const AdminReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      // ✅ API call to admin referrals endpoint
      const res = await API.get("/admin/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setReferrals(res.data.referrals || []);
      } else {
        setError("Failed to load referrals.");
      }
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
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Total Referrals</th>
              <th>Referrals (Status)</th>
              <th>Deposited Referrals</th>
              <th>Withdraw Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, index) => (
              <tr key={ref.userId || index}>
                <td>{index + 1}</td>
                <td>{ref.username}</td>
                <td>{ref.email}</td>
                <td>{ref.totalReferrals}</td>
                <td>
                  {ref.referrals?.length > 0 ? (
                    <ul>
                      {ref.referrals.map((r, i) => (
                        <li key={i}>
                          {r.username} ({r.email}) —{" "}
                          <strong
                            style={{
                              color: r.hasDeposited ? "green" : "red",
                            }}
                          >
                            {r.hasDeposited ? "Deposited ✅" : "Not Deposited ❌"}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No referrals"
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <strong>{ref.depositedReferrals || 0}</strong>
                </td>
                <td style={{ textAlign: "center" }}>
                  {ref.eligibleToWithdraw ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Eligible
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ❌ Not Eligible
                    </span>
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
