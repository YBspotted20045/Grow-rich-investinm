// src/pages/admin/AdminWithdrawals.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminWithdrawals() {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWithdrawals(data.withdrawals || []);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
    }
  };

  const updateWithdrawal = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/withdrawals/${id}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWithdrawals();
    } catch (err) {
      console.error(`Error updating withdrawal:`, err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "30px", textAlign: "center" }}>
          Admin Panel
        </h2>
        <button onClick={() => navigate("/admin/dashboard")} style={btnStyle}>
          Dashboard
        </button>
        <button onClick={() => navigate("/admin/users")} style={btnStyle}>
          Users
        </button>
        <button onClick={() => navigate("/admin/deposits")} style={btnStyle}>
          Deposits
        </button>
        <button onClick={() => navigate("/admin/withdrawals")} style={btnActive}>
          Withdrawals
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: "#f8fafc" }}>
        {/* Topbar */}
        <div
          style={{
            background: "#fff",
            padding: "15px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "18px", margin: 0 }}>Manage Withdrawals</h1>
          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>All Withdrawals</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
              <thead>
                <tr style={{ background: "#e2e8f0" }}>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Bank</th>
                  <th style={thStyle}>Account</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.length > 0 ? (
                  withdrawals.map((w) => (
                    <tr key={w._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={tdStyle}>{w.user?.username || "Unknown"}</td>
                      <td style={tdStyle}>₦{w.amount}</td>
                      <td style={tdStyle}>{w.bankName || "—"}</td>
                      <td style={tdStyle}>
                        {w.accountNumber || "—"} ({w.accountName || "—"})
                      </td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "5px",
                            fontSize: "13px",
                            background:
                              w.status === "approved"
                                ? "#16a34a"
                                : w.status === "pending"
                                ? "#facc15"
                                : "#dc2626",
                            color: w.status === "pending" ? "#000" : "#fff",
                          }}
                        >
                          {w.status}
                        </span>
                      </td>
                      <td style={tdStyle}>{new Date(w.createdAt).toLocaleDateString()}</td>
                      <td style={tdStyle}>
                        {w.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateWithdrawal(w._id, "approve")}
                              style={approveBtn}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateWithdrawal(w._id, "reject")}
                              style={rejectBtn}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                      No withdrawals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar button styles
const btnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  textAlign: "left",
  padding: "12px 10px",
  marginBottom: "10px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "15px",
};

const btnActive = {
  ...btnStyle,
  background: "#334155",
};

// Table styles
const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontWeight: "bold",
  fontSize: "14px",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
};

// Buttons
const approveBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "5px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
};

const rejectBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "13px",
};
