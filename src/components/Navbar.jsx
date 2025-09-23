import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          🌱 GrowRich
        </Link>

        {/* Links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Signup
          </Link>
          <Link
            to="/dashboard"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/login"
            className="hover:bg-green-700 px-3 py-2 rounded-md transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
