import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <span>Welcome, Admin</span>
        {/* You can add profile picture or settings icon here */}
      </div>
    </header>
  );
};

export default Header;
