import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Make sure your animation is in this CSS

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        {/* Bright animated logo */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '180px',
            margin: '0 auto 20px',
            animation: 'float 3s ease-in-out infinite',
            filter: 'brightness(600%)'
          }}
        />

        <h2 className="text-2xl font-bold mb-6">Login to GrowRich</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
