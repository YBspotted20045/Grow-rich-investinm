import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import InvestmentCard from "../components/InvestmentCard.jsx";

const Investment = () => {
  const [plans, setPlans] = useState([
    { amount: 10000, duration: 9 }, // 9 days doubling
    { amount: 20000, duration: 9 },
  ]);
  const [userInvestment, setUserInvestment] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchUserInvestment = async () => {
    try {
      const res = await axios.get("/investments/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInvestment(res.data.investment || null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch investment");
    }
  };

  const startInvestment = async (amount) => {
    try {
      const res = await axios.post(
        "/investments/start",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserInvestment(res.data.investment);
      setMessage("Investment started successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(() => {
    fetchUserInvestment();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Start New Investment</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <InvestmentCard
              key={plan.amount}
              amount={plan.amount}
              duration={plan.duration}
              onInvest={() => startInvestment(plan.amount)}
              disabled={
                userInvestment && userInvestment.status === "active"
              }
            />
          ))}
        </div>
        {userInvestment && userInvestment.status === "active" && (
          <p className="mt-4 text-blue-600">
            Your current investment: ₦{userInvestment.amount} (matures on{" "}
            {new Date(userInvestment.maturityDate).toLocaleDateString()})
          </p>
        )}
      </div>
    </div>
  );
};

export default Investment;
