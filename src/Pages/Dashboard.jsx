import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import InvestmentsForm from "./InvestmentForm.jsx";
import ReferralDashboard from "./ReferralDashboard.jsx";
import Withdrawal from "./Withdrawal.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("gr_token"); // ✅ match with Login.jsx
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("gr_token"); // ✅ match key
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.fullName}</h1>
      <div className="dashboard-section">
        <InvestmentsForm user={user} />
        <ReferralDashboard user={user} />
        <Withdrawal user={user} />
      </div>
    </div>
  );
}

export default Dashboard;
