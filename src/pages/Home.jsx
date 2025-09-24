// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-black text-white py-6 shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-500 tracking-wide">
          GrowRich Investments
        </h1>
        <p className="text-center mt-2 text-lg md:text-xl text-gray-200">
          Invest, Refer & Grow Your Wealth
        </p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Build Wealth With Confidence
        </h2>
        <p className="text-gray-700 max-w-2xl mb-8">
          Join thousands already growing their wealth with GrowRich.
          Secure investments, trusted system, and referral rewards.
        </p>
      </section>

      {/* Actions */}
      <section className="flex flex-col md:flex-row justify-center gap-12 my-12 px-6">
        {/* Login Card */}
        <div className="bg-black border border-yellow-500 shadow-lg rounded-2xl p-8 w-full max-w-sm text-center hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-yellow-500">
            Already a Member?
          </h3>
          <p className="text-gray-300 mb-6">
            Access your account and continue your journey.
          </p>
          <Link
            to="/login"
            className="block w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            Login
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-black shadow-lg rounded-2xl p-8 w-full max-w-sm text-center hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-black">
            New to GrowRich?
          </h3>
          <p className="text-gray-700 mb-6">
            Create a free account today and start investing with as little as ₦5,000.
          </p>
          <Link
            to="/signup"
            className="block w-full py-3 bg-black text-yellow-500 font-bold rounded-lg hover:bg-gray-900 transition"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-6 mt-auto">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} GrowRich Investments. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
