// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "../axios"; // centralized axios instance
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/users/me");
        setUser(res.data.user);
        setDeposits(res.data.deposits);
        setInvestment(res.data.investment);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card title="Investment Amount" value={investment?.amount || 0} />
          <Card
            title="Maturity Date"
            value={
              investment?.maturityDate
                ? new Date(investment.maturityDate).toLocaleDateString()
                : "N/A"
            }
          />
          <Card title="Total Deposits" value={deposits.length} />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Recent Deposits</h2>
          {deposits.length === 0 ? (
            <p>No deposits yet.</p>
          ) : (
            <ul className="space-y-2">
              {deposits.map((d) => (
                <li
                  key={d._id}
                  className="p-2 bg-white rounded shadow flex justify-between"
                >
                  <span>₦{d.amount}</span>
                  <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                  <span
                    className={`${
                      d.status === "approved"
                        ? "text-green-600"
                        : d.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {d.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Your Referrals</h2>
          {user.referrals.length === 0 ? (
            <p>No referrals yet.</p>
          ) : (
            <ul className="space-y-2">
              {user.referrals.map((r) => (
                <li
                  key={r._id}
                  className="p-2 bg-white rounded shadow flex justify-between"
                >
                  <span>{r.username || r.email}</span>
                  <span>₦{r.investmentAmount || 0}</span>
                  <span>
                    {r.maturityDate
                      ? new Date(r.maturityDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
