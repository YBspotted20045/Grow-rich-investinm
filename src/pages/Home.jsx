import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Welcome to GrowRich Investments
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Grow your wealth with our trusted investment plans. Join now and start earning!
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
