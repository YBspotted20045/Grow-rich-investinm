import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [showMessage, setShowMessage] = useState(true);

  // Hide deposit message after 3 minutes (180000 ms)
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 180000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-yellow-900 text-white p-4 md:p-10">
      
      {/* Deposit Approved Message */}
      {showMessage && (
        <div className="text-green-400 font-semibold mb-4 animate-pulse">
          ✅ Deposit approved successfully!
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
        Your Investment Overview
      </h1>

      {/* Cards Section */}
      <div className="space-y-6">
        
        {/* Big Top Card */}
        <div className="bg-black/70 border border-yellow-500 rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-yellow-500/30">
          <h2 className="text-lg text-yellow-400 font-semibold">
            Total Income (Expected Return)
          </h2>
          <p className="text-4xl font-bold mt-2 text-white">₦40,000</p>
        </div>

        {/* Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Amount Deposited */}
          <div className="bg-black/70 border border-yellow-500 rounded-2xl p-4 shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/30 transition-all duration-300">
            <h3 className="text-yellow-400 font-semibold">Amount Deposited</h3>
            <p className="text-xl font-bold mt-2">₦20,000</p>
          </div>

          {/* Approval Date */}
          <div className="bg-black/70 border border-yellow-500 rounded-2xl p-4 shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/30 transition-all duration-300">
            <h3 className="text-yellow-400 font-semibold">Approval Date</h3>
            <p className="mt-2">Sun Oct 05 2025</p>
          </div>

          {/* Maturity Date */}
          <div className="bg-black/70 border border-yellow-500 rounded-2xl p-4 shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/30 transition-all duration-300">
            <h3 className="text-yellow-400 font-semibold">Maturity Date</h3>
            <p className="mt-2">Sun Oct 19 2025</p>
          </div>

          {/* Referral Requirement */}
          <div className="bg-black/70 border border-yellow-500 rounded-2xl p-4 shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/30 transition-all duration-300">
            <h3 className="text-yellow-400 font-semibold">Referral Requirement</h3>
            <p className="mt-2">0/2 referrals have deposited</p>
          </div>

          {/* Withdrawal Eligibility */}
          <div className="bg-black/70 border border-yellow-500 rounded-2xl p-4 shadow-lg hover:scale-[1.03] hover:shadow-yellow-500/30 transition-all duration-300 sm:col-span-2">
            <h3 className="text-yellow-400 font-semibold">Withdrawal Eligibility</h3>
            <p className="mt-2 text-red-500 font-bold">❌ Not Yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
