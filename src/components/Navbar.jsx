import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 hover:text-blue-500 transition"
        >
          QuizApp
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tests"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Tests
          </NavLink>

          <NavLink
            to="/results"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Results
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
