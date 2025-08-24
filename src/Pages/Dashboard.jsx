// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../axios"; // centralized axios instance
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [stats, setStats] = useState({ plans: [], statuses: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Plans Distribution */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Investment Plans</h2>
          <PieChart width={350} height={300}>
            <Pie
              data={stats.plans}
              dataKey="amount"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.plans.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Investment Status</h2>
          <BarChart
            width={350}
            height={300}
            data={stats.statuses}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
