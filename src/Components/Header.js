import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../Contexts/Firebase";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoggedIn(!!firebase.user);
  }, [location, firebase]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    firebase.logoutUser();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 py-4">
      <nav className="flex items-center justify-between px-4 md:px-8">
        <Link to="/">
        <h1 className="text-white text-4xl font-bold">Todo App</h1>
        </Link>

        <div className="md:hidden relative">
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {isMenuOpen && (
            <div className="absolute bg-white top-full right-0 mt-2 p-2 shadow-lg">
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? "bg-teal-400 rounded" : ""
                } text-gray-800 block py-2 px-4 hover:bg-gray-200`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about" ? "bg-teal-400 rounded" : ""
                } text-gray-800 block py-2 px-4 hover:bg-gray-200`}
              >
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <div className="flex items-center">
                    {firebase.user && firebase.user.photoURL ? (
                      <img
                        src={firebase.user.photoURL}
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    ) : null}
                    <button
                      onClick={handleLogout}
                      className="text-gray-800 block py-2 px-4 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login" ? "bg-teal-400 rounded" : ""
                  } text-gray-800 block py-2 px-4 hover:bg-gray-200`}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "bg-teal-400 rounded" : ""
            } text-white hover:text-gray-300 px-4 py-2 block md:inline-block`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${
              location.pathname === "/about" ? "bg-teal-400 rounded" : ""
            } text-white hover:text-gray-300 px-4 py-2 block md:inline-block`}
          >
            About
          </Link>
          <div className="flex justify-center items-center">
            <button className="text-center hover:text-gray-300 rounded-lg">
              <Link
                to="https://icilyassertiveindoors.com/u1kfxwcti?key=5f6c43b068192a774117f5dbcba0b99e"
                className="block px-4 py-2"
              >
                <span className="text-white">Donate Us</span>
              </Link>
            </button>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center ml-4">
              {firebase.user && firebase.user.photoURL ? (
                <img
                  src={firebase.user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : null}
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 px-4 py-2 block md:inline-block"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`${
                location.pathname === "/login" ? "bg-teal-400 rounded" : ""
              } text-white hover:text-gray-300 px-4 py-2 block md:inline-block`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
