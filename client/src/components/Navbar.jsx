import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="logo-brand text-xl font-bold">
            <NavLink to="/" className="hover:text-gray-400">
              Demo
            </NavLink>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-gray-400"
                  }
                >
                  Contact
                </NavLink>
              </li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "text-yellow-500" : "hover:text-gray-400"
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "text-yellow-500" : "hover:text-gray-400"
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hover:text-gray-400"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
