// src/Pages/Deposit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

function Deposit() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receipt) {
      setMessage("Please select an amount and upload your receipt.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("receipt", receipt);

      const res = await API.post("/deposit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Deposit submitted successfully!");
      setAmount("");
      setReceipt(null);
    } catch (err) {
      console.error("Deposit error:", err);
      setMessage("Error uploading deposit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Make a Deposit</h2>

        <div style={styles.infoBox}>
          <h3>Payment Details</h3>
          <p><strong>Bank:</strong> PalmPay</p>
          <p><strong>Account Number:</strong> 8984550866</p>
          <p><strong>Account Name:</strong> Nnaji Kelvin Somtochukwu</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Select Amount</label>
          <select
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          >
            <option value="">-- Choose an amount --</option>
            <option value="10000">₦10,000</option>
            <option value="20000">₦20,000</option>
          </select>

          <label style={styles.label}>Upload Payment Receipt</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={styles.input}
            accept="image/*"
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit Deposit"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8f9fa",
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
    maxWidth: "500px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  infoBox: {
    background: "#f1f1f1",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#28a745",
    fontWeight: "bold",
  },
};

export default Deposit;
