import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils.js";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice.js";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const LoggedInUser = useSelector((state) => state.Agent.LoggedInUser);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    dispatch(logout());
    enqueueSnackbar("Logout Success.", {
      variant: "info",
    });

    navigateTo("/");
  };

  const moveToContact = () => {
    window.scrollBy({
      top: document.body.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth",
    });
  };

  const ScrollDownArrow = () => {
    window.scrollBy({
      top: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col items-start md:items-center p-2 z-50  md:flex-row">
      {/* Main Logo */}
      <Link to="/" className="relative z-50">
        <img
          src={getImageUrl("Navbar/logoupchaar.png")}
          alt="Logo"
          className="w-[250px] max-md:w-[200px] max-[300px]:w-[180px] "
        />
      </Link>

      {/* Secondary Logo at the top right */}
      <div className="absolute top-24 right-4 max-md:hidden">
        <img
          src={getImageUrl("Navbar/nlogo.png")}
          alt="Logo"
          className="h-auto w-[300px]"
        />
      </div>

      {/* Combined Heading for Responsive Text Wrapping */}
      <div className="absolute top-48 text-6xl font-serif px-4 md:top-56 text-center md:text-left max-md:text-4xl z-10">
        <h2 className="font-output tracking-wider font-semibold text-orange-500">
          Upchaar: Where <span className="italic">A.I.</span>
          <br />
          <span className="block mx-1 my-2 text-4xl max-md:inline">
            Meets Authentic Care 🩺
          </span>
        </h2>
      </div>

      {/* Buttons Container */}
      <div className="absolute top-96 left-[20%] flex flex-row space-x-4 md:space-x-8 z-10 max-md:mt-10 max-md:left-[5%] ">
        {/* Register Button */}
        {!LoggedInUser && (
          <Link
            to="/register"
            className="font-output tracking-wider text-base font-semibold px-6 md:px-10 py-2 md:py-3 bg-green-500 text-white rounded-full "
          >
            REGISTER
          </Link>
        )}

        {/* Login or Logout Button */}
        {LoggedInUser ? (
          <div
            className="flex flex-col items-center justify-center cursor-pointer rounded-lg transform transition duration-300 hover:scale-105"
            onClick={ScrollDownArrow}
          >
            <ChevronDownIcon className="w-14 h-14 text-white animate-bounce max-[300px]:mt-5" />
            <p className="mt-2 text-xl font-semibold text-white">Scroll Down</p>
          </div>
        ) : (
          <Link
            to="/login"
            className="font-output tracking-wider text-base font-bold px-8 md:px-12 py-2 md:py-3 bg-transparent text-black rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white "
          >
            LOGIN
          </Link>
        )}
      </div>

      {/* Hamburger Menu Icon for Small Screens */}
      <button
        className="absolute top-4 right-4 md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <XIcon className="w-8 h-8 text-black" />
        ) : (
          <MenuIcon className="w-8 h-8 text-black" />
        )}
      </button>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-10 absolute top-6 md:top-10 right-5 font-sans font-bold z-10 rounded-lg md:rounded-none shadow-md md:shadow-none transition-all duration-300 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li>
          <Link to="/" className="hover:bg-orange-400 p-2 rounded-md">
            HOME
          </Link>
        </li>
        <li>
          {LoggedInUser ? (
            <button
              onClick={handleLogout}
              className="text-black hover:bg-orange-400 p-2 rounded-md"
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/login" className="hover:bg-orange-400 p-2 rounded-md">
              LOGIN
            </Link>
          )}
        </li>
        <li>
          {LoggedInUser ? (
            <Link to="/profile" className="hover:bg-orange-400 p-2 rounded-md">
              PROFILE
            </Link>
          ) : (
            <button
              onClick={moveToContact}
              className="hover:bg-orange-400 p-2 rounded-md"
            >
              CONTACT
            </button>
          )}
        </li>
        <li>
          <Link to="/faq" className="hover:bg-orange-400 p-2 rounded-md">
            FAQ's
          </Link>
        </li>
        {LoggedInUser && (
          <li>
            <Link to="/features" className="hover:bg-orange-400 p-2 rounded-md">
              FEATURES
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
