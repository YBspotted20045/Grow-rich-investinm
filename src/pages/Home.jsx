import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        🌱 Welcome to GrowRich
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        Invest and grow your wealth with us. Start your journey today and take
        advantage of our secure investment platform with referral bonuses.
      </p>

      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
