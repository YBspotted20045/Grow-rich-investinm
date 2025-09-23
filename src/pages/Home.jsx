import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to GrowRich Investments</h1>
        <p className="mb-6">
          Invest, refer, and grow your wealth. Join thousands of others who are maximizing their returns.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Sign Up
          </Link>
          <Link to="/login" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700">
            Login
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
