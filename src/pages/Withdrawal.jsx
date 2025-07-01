import React from 'react';

const Withdrawal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300">
      <div className="max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-800 mb-4">Withdrawal Instructions</h1>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>You can only request withdrawal after your investment has matured (14 days).</li>
          <li>You must meet the following referral conditions to withdraw:</li>
          <ul className="ml-4 list-disc">
            <li>
              If this is your first withdrawal after a 14-day cycle, refer at least <strong>2 new users</strong>.
            </li>
            <li>
              If you reinvested without withdrawing in your last cycle, only <strong>1 new referral</strong> is required.
            </li>
          </ul>
          <li>Withdrawal is processed manually via PalmPay:</li>
          <ul className="ml-4">
            <li><strong>Name:</strong> Nnaji Kelvin Somtochukwu</li>
            <li><strong>Account Number:</strong> 8984550866</li>
          </ul>
          <li>Once eligible, go to the dashboard and click the “Withdraw” button to submit a request.</li>
        </ul>
      </div>
    </div>
  );
};

export default Withdrawal;
