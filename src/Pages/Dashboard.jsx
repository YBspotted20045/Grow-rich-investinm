import React, { useEffect, useState } from "react";
import API from "../axios";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import {
  Box, Grid, Paper, Typography, CircularProgress, Card, CardContent
} from "@mui/material";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );

  // Pie Chart – investment allocation
  const investmentAllocation = [
    { name: "₦5,000", value: user.investmentAmount === 5000 ? 1 : 0 },
    { name: "₦10,000", value: user.investmentAmount === 10000 ? 1 : 0 },
    { name: "₦15,000", value: user.investmentAmount === 15000 ? 1 : 0 },
  ];

  // Line Chart – earnings growth across cycles
  const growthData =
    user.cycles?.map((c, i) => ({
      cycle: `Cycle ${i + 1}`,
      earnings: c.earnings,
    })) || [{ cycle: "Cycle 1", earnings: 0 }];

  // Bar Chart – referrals
  const referralData = [
    { type: "Direct Referrals", count: user.directReferrals || 0 },
    { type: "Indirect Referrals", count: user.indirectReferrals || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        GrowRich Dashboard
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Your Investment" value={`₦${user.investmentAmount || 0}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Earnings" value={`₦${user.earnings || 0}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Referrals" value={`${user.directReferrals || 0} Direct`} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Maturity Status" value={user.maturityStatus || "Pending"} />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={chartBox}>
            <Typography variant="h6" gutterBottom>
              Investment Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={investmentAllocation} dataKey="value" outerRadius={80} label>
                  {investmentAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={chartBox}>
            <Typography variant="h6" gutterBottom>
              Earnings Growth
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cycle" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={chartBox}>
            <Typography variant="h6" gutterBottom>
              Referral Performance
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Next Withdrawal Condition"
            value={user.nextWithdrawalCondition || "Complete referrals to withdraw"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Total Referrals"
            value={`${user.directReferrals || 0} Direct, ${user.indirectReferrals || 0} Indirect`}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

// Reusable Stat Card (MUI)
const StatCard = ({ title, value }) => (
  <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight="bold" color="primary">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const chartBox = {
  padding: 2,
  borderRadius: 2,
  boxShadow: 3,
};
