// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleCopyReferral = () => {
    const referralLink = `${window.location.origin}/signup?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setMessage("Referral link copied!");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user.username} 👋</h2>
        <p>Email: {user.email}</p>

        <div style={styles.section}>
          <h3>Your Referral Code</h3>
          <p style={styles.referral}>{user.referralCode}</p>
          <button onClick={handleCopyReferral} style={styles.button}>
            Copy Referral Link
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>

        <div style={styles.section}>
          <h3>Referral Stats</h3>
          <p>Total Referrals: {user.referrals?.length || 0}</p>
        </div>

        <div style={styles.section}>
          <h3>Deposits</h3>
          {user.deposits && user.deposits.length > 0 ? (
            <ul style={styles.list}>
              {user.deposits.map((d, idx) => (
                <li key={idx} style={styles.listItem}>
                  Amount: ₦{d.amount} | Status: {d.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No deposits yet</p>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={{ ...styles.button, backgroundColor: "#dc3545" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
  },
  section: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "6px",
    background: "#f9f9f9",
  },
  referral: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#007bff",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  message: {
    marginTop: "8px",
    color: "#28a745",
    fontSize: "14px",
  },
  list: {
    marginTop: "10px",
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "6px",
    fontSize: "14px",
  },
};

export default Dashboard;
