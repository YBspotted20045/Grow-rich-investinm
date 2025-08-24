import React, { useEffect, useState } from "react";
import API from "../axios";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.fullName}</h2>
      <table className="dashboard-table">
        <tbody>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{user.state}</td>
          </tr>
          <tr>
            <th>Investment</th>
            <td>{user.investment || "NO Investment"}</td>
          </tr>
          <tr>
            <th>Investment Date</th>
            <td>{user.investmentDate || "—"}</td>
          </tr>
          <tr>
            <th>Expected Earnings (14 days)</th>
            <td>{user.expectedEarnings || "—"}</td>
          </tr>
          <tr>
            <th>Referral Code</th>
            <td>{user.referralCode}</td>
          </tr>
          <tr>
            <th>Referred By</th>
            <td>{user.referredBy || "None"}</td>
          </tr>
          <tr>
            <th>Payment Status</th>
            <td>{user.paymentStatus || "Pending"}</td>
          </tr>
          <tr>
            <th>Referrals</th>
            <td>
              {user.referrals && user.referrals.length > 0
                ? user.referrals.join(", ")
                : "No referrals yet."}
            </td>
          </tr>
          <tr>
            <th>⚡ Actions</th>
            <td>
              <button className="dashboard-btn reinvest">Reinvest</button>
              <button className="dashboard-btn withdraw">Withdraw</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
