import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import API from "./axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [deposit, setDeposit] = useState(null);
  const [approvedReferrals, setApprovedReferrals] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/deposits/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const deposits = res.data.deposits || [];
        const latestApproved = deposits
          .filter((d) => d.status === "approved")
          .sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt))[0];

        setDeposit(latestApproved || null);

        if (latestApproved) {
          setMessage("✅ Deposit approved successfully!");
          // Hide after 3 minutes
          setTimeout(() => setMessage(""), 3 * 60 * 1000);
        } else {
          setMessage("⚠️ No approved deposit yet.");
        }
      } else {
        setMessage("❌ Failed to load deposits.");
      }
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setMessage("⚠️ Error loading your dashboard.");
    }
  };

  const fetchReferrals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/referrals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovedReferrals(res.data.approvedReferralCount || 0);
    } catch (err) {
      console.error("Error fetching referrals:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDeposits();
      await fetchReferrals();
      setLoading(false);
    };
    loadData();

    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="dashboard-container">
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  const amount = deposit?.amount || 0;
  const approvedAt = deposit?.approvedAt || null;
  const maturityDate = approvedAt
    ? new Date(new Date(approvedAt).getTime() + 14 * 24 * 60 * 60 * 1000)
    : null;
  const expectedReturn = amount * 2;
  const matured = maturityDate ? new Date() >= maturityDate : false;
  const withdrawalEligible = matured && approvedReferrals >= 2;

  return (
    <Layout>
      <div className="dashboard-container">
        <AnimatePresence>
          {message && message.includes("approved") && (
            <motion.p
              key="approval-message"
              className="approval-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.h2
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Investment Overview
        </motion.h2>

        <div className="vertical-cards">
          {/* Top large card - Total Income */}
          <motion.div
            className="info-card large-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <h3>Total Income (Expected Return)</h3>
            <p>₦{expectedReturn.toLocaleString()}</p>
          </motion.div>

          {/* Smaller cards */}
          {[
            { label: "Amount Deposited", value: `₦${amount.toLocaleString()}` },
            {
              label: "Approval Date",
              value: approvedAt ? new Date(approvedAt).toDateString() : "—",
            },
            {
              label: "Maturity Date",
              value: maturityDate ? maturityDate.toDateString() : "—",
            },
            {
              label: "Referral Requirement",
              value: `${approvedReferrals}/2 referrals have deposited`,
            },
            {
              label: "Withdrawal Eligibility",
              value: withdrawalEligible ? "✅ Eligible" : "❌ Not Yet",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="info-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
