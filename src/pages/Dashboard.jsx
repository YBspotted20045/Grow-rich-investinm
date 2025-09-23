import React, { useEffect, useState } from "react";
import API from "../axios.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
        setDeposits(res.data.deposits);
        setInvestment(res.data.investment);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.fullName}</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Current Investment</h2>
        {investment ? (
          <div>
            <p>Amount: ₦{investment.amount}</p>
            <p>Status: {investment.status}</p>
            <p>Maturity Date: {new Date(investment.maturityDate).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No active investment.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Deposits</h2>
        {deposits.length > 0 ? (
          <ul className="list-disc pl-5">
            {deposits.map((d) => (
              <li key={d._id}>
                ₦{d.amount} - {d.status} - {new Date(d.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No deposits yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
