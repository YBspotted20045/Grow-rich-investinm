import React from 'react';

const Referral = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Referral Rules</h1>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>Every user gets a referral link after registering.</li>
          <li>₦5,000 investors can only refer new ₦5,000 users.</li>
          <li>₦10,000 and ₦15,000 investors can refer ₦10k and ₦15k users respectively.</li>
          <li>To be eligible for withdrawal:
            <ul className="ml-4 list-disc">
              <li>Refer 2 people if you’re withdrawing after a matured investment.</li>
              <li>Refer just 1 person if you reinvested without withdrawing in the previous cycle.</li>
            </ul>
          </li>
          <li>Manual payment is done via PalmPay:<br />
              <strong>Nnaji Kelvin Somtochukwu</strong><br />
              <strong>8984550866</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Referral;
