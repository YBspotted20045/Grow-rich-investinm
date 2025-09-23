// src/components/InvestmentCard.jsx
import React from "react";

const InvestmentCard = ({ plan, amount, status, startDate, maturityDate, onAction, actionLabel }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm mx-auto my-2">
      <h2 className="text-xl font-semibold mb-2">{plan}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Amount:</strong> ₦{amount.toLocaleString()}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Status:</strong> {status}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-3">
        <strong>Maturity Date:</strong> {new Date(maturityDate).toLocaleDateString()}
      </p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default InvestmentCard;
