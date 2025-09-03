import React from "react";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const navigate = useNavigate();

  const handleDepositClick = (amount) => {
    // Redirect to Vendor page and pass amount as state
    navigate("/vendor", { state: { amount } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Deposit</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* ₦5,000 Option */}
        <div
          onClick={() => handleDepositClick(5000)}
          className="bg-white border rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            ₦5,000 Package
          </h3>
          <p className="text-gray-600">Start with ₦5,000 and grow your wealth.</p>
          <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-700">
            Deposit ₦5,000
          </button>
        </div>

        {/* ₦10,000 Option */}
        <div
          onClick={() => handleDepositClick(10000)}
          className="bg-white border rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            ₦10,000 Package
          </h3>
          <p className="text-gray-600">Double your returns with ₦10,000.</p>
          <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-700">
            Deposit ₦10,000
          </button>
        </div>

        {/* ₦15,000 Option */}
        <div
          onClick={() => handleDepositClick(15000)}
          className="bg-white border rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            ₦15,000 Package
          </h3>
          <p className="text-gray-600">Go premium with ₦15,000 investment.</p>
          <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-700">
            Deposit ₦15,000
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
