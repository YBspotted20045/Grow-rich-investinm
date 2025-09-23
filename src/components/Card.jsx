import React from "react";

const Card = ({ title, value, icon, bgColor = "bg-white", textColor = "text-gray-800" }) => {
  return (
    <div className={`p-4 rounded shadow ${bgColor} flex items-center justify-between`}>
      <div>
        <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
        <p className={`text-xl font-bold mt-2 ${textColor}`}>{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default Card;
