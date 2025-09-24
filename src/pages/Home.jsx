// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      {/* Header */}
      <header className="w-full bg-black text-white py-6">
        <h1 className="text-4xl font-bold text-center text-yellow-500">
          GrowRich Investments
        </h1>
        <p className="text-center mt-2 text-white">
          Invest, Refer & Grow Your Wealth
        </p>
      </header>

      {/* Login Section */}
      <section className="flex flex-col items-center my-12">
        <h2 className="text-2xl font-bold mb-4">Already have an account?</h2>
        <Link
          to="/login"
          className="px-10 py-3 bg-black text-yellow-500 font-bold rounded hover:bg-gray-800"
        >
          Login
        </Link>
      </section>

      {/* Sign Up Section */}
      <section className="flex flex-col items-center my-12">
        <h2 className="text-2xl font-bold mb-4">New here? Join us today</h2>
        <Link
          to="/signup"
          className="px-10 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
        >
          Sign Up
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} GrowRich Investments. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
