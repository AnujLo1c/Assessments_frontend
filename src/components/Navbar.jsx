import { Link, NavLink,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
   const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
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


         {user && (
          <>
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
           <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          onClick={handleLogout}
          >
            LogOut
          </NavLink>
          </>
          )
}
{!user &&(<>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `hover:text-blue-600 transition ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            SignUp
          </NavLink>
        
        </>
)
}
</div>
      </div>
    </nav>
  );
}
