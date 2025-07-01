import React from 'react';

const RecurringBusiness = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
      <div className="max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Recurring Business Logic</h1>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Users can invest ₦5,000, ₦10,000, or ₦15,000.</li>
          <li>₦5k users can only refer ₦5k users.</li>
          <li>₦10k and ₦15k users can refer each other.</li>
          <li>Each investment matures after 14 days.</li>
          <li>To withdraw after maturity, user must:
            <ul className="ml-4 list-disc">
              <li>Reinvest the same or higher package.</li>
              <li>Refer 2 new users (only 1 if they reinvested without withdrawing).</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecurringBusiness;
