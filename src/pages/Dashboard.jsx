import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import DepositList from "../components/DepositList.jsx";
import ReferralList from "../components/ReferralList.jsx";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Investment Amount" value={`₦${userData.investment?.amount || 0}`} />
          <StatsCard title="Maturity Date" value={userData.investment?.maturityDate ? new Date(userData.investment.maturityDate).toLocaleDateString() : "-"} />
          <StatsCard title="Referrals" value={userData.user.referrals?.length || 0} />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Deposits</h2>
          <DepositList deposits={userData.deposits} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Referred Users</h2>
          <ReferralList referrals={userData.user.referrals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
