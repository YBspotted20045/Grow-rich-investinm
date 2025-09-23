import React, { useEffect, useState } from "react";
import axios from "../axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Table from "../components/Table";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/me");
        setUserData(res.data.user);
        setDeposits(res.data.deposits);
        setInvestment(res.data.investment);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="dashboard-content">
          <h1>Welcome, {userData?.username || "User"}</h1>

          <div className="stats-cards">
            <Card title="Current Investment" value={investment?.amount || 0} />
            <Card title="Maturity Date" value={investment?.maturityDate ? new Date(investment.maturityDate).toLocaleDateString() : "-"} />
            <Card title="Total Deposits" value={deposits.reduce((acc, dep) => acc + dep.amount, 0)} />
            <Card title="Referrals Count" value={userData?.referrals?.length || 0} />
          </div>

          <div className="table-section">
            <h2>Your Deposits</h2>
            <Table data={deposits} columns={["amount", "status", "createdAt"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
