import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../axios";
import { useNavigate } from "react-router-dom";
import InvestmentsForm from "./InvestmentsForm.jsx";
import Referrals from "./Referrals";
import Withdrawal from "./Withdrawal";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        localStorage.removeItem("token");
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
        <Investments user={user} />
        <Referrals user={user} />
        <Withdrawal user={user} />
      </div>
    </div>
  );
}

export default Dashboard;
