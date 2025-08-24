// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@mui/material";

// Example dummy data
const data = [
  { name: "Week 1", investments: 5000, withdrawals: 2000 },
  { name: "Week 2", investments: 10000, withdrawals: 4000 },
  { name: "Week 3", investments: 7000, withdrawals: 3000 },
  { name: "Week 4", investments: 12000, withdrawals: 8000 },
];

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard</h2>
      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="investments" stroke="#4CAF50" />
              <Line type="monotone" dataKey="withdrawals" stroke="#FF5722" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
