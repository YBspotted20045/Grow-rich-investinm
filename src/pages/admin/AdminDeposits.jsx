// src/pages/admin/AdminDeposits.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDeposits() {
  const navigate = useNavigate();
  const [deposits, setDeposits] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/deposits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDeposits(data.deposits || []);
    } catch (err) {
      console.error("Error fetching deposits:", err);
    }
  };

  const updateDeposit = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/deposits/${id}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDeposits(); // refresh list
    } catch (err) {
      console.error(`Error updating deposit:`, err);
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
        <button onClick={() => navigate("/admin/deposits")} style={btnActive}>
          Deposits
        </button>
        <button onClick={() => navigate("/admin/withdrawals")} style={btnStyle}>
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
          <h1 style={{ fontSize: "18px", margin: 0 }}>Manage Deposits</h1>
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
          <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>All Deposits</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
              <thead>
                <tr style={{ background: "#e2e8f0" }}>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length > 0 ? (
                  deposits.map((d) => (
                    <tr key={d._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={tdStyle}>{d.user?.username || "Unknown"}</td>
                      <td style={tdStyle}>₦{d.amount}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "5px",
                            fontSize: "13px",
                            background:
                              d.status === "approved"
                                ? "#16a34a"
                                : d.status === "pending"
                                ? "#facc15"
                                : "#dc2626",
                            color: d.status === "pending" ? "#000" : "#fff",
                          }}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td style={tdStyle}>{new Date(d.createdAt).toLocaleDateString()}</td>
                      <td style={tdStyle}>
                        {d.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateDeposit(d._id, "approve")}
                              style={approveBtn}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateDeposit(d._id, "reject")}
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
                    <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                      No deposits found.
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
