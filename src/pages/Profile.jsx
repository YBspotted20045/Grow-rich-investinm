// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState({ balance: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const API_BASE = "https://grow-0nfm.onrender.com";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/coins/${storedUser.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCoins(data);
        } else {
          setErr(data.message || "Failed to fetch coin data");
        }
      } catch (error) {
        console.error("Error fetching coins:", error);
        setErr("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (err) {
    return <div className="error-message">{err}</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Coin Balance:</strong> {coins.balance} coins</p>
      </div>

      <h2>Transaction History</h2>
      {coins.transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="transactions-list">
          {coins.transactions.map((tx, index) => (
            <li key={index}>
              <span>{tx.transactionType.toUpperCase()} - {tx.amount} coins</span>
              <small>{tx.description}</small>
              <small>{new Date(tx.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
