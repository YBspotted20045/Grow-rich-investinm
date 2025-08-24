import React, { useEffect, useState } from "react";
import API from "../axios";

export default function Dashboard() {
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

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#ff6b6b" }}>
        User Dashboard
      </h2>

      <div style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "15px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden"
        }}>
          <tbody>
            <tr>
              <td style={cellStyle}>Welcome</td>
              <td style={cellStyle}>{user ? user.username : "Loading..."}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Email</td>
              <td style={cellStyle}>{user ? user.email : "Loading..."}</td>
            </tr>
            <tr>
              <td style={cellStyle}>State</td>
              <td style={cellStyle}>{user ? user.state : "Loading..."}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Investment</td>
              <td style={cellStyle}>{user?.investment || "NO Investment"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Investment Date</td>
              <td style={cellStyle}>{user?.investmentDate || "—"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Expected Earnings</td>
              <td style={cellStyle}>{user?.expectedEarnings || "—"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Referral Code</td>
              <td style={cellStyle}>{user?.referralCode || "—"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Referred By</td>
              <td style={cellStyle}>{user?.referredBy || "None"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Payment Status</td>
              <td style={cellStyle}>{user?.paymentStatus || "Pending"}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Your Referrals</td>
              <td style={cellStyle}>
                {user?.referrals?.length > 0 ? user.referrals.join(", ") : "No referrals yet"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};
