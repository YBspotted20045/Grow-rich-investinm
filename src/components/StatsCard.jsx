// src/components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg shadow-md ${bgColor || "bg-white"}`}>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </div>
  );
};

export default StatsCard;
