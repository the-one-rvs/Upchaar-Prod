import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils.js";
import Home from "../../pages/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logout } from "../../redux/user/userSlice.js";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const NavbarLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const LoggedInUser = useSelector((state) => state.Agent.LoggedInUser);
  const handleLogout = async () => {
    dispatch(logout());
    enqueueSnackbar("Logout Success.", {
      variant: "info",
    });

    navigateTo("/");
  };

  return (
    <>
      <div className="relative flex">
        <Link to="/" className="relative top-0 left-0 z-50 pt-6 pr-2">
          <img
            src={getImageUrl("Navbar/logoupchaar.png")}
            alt="Logo"
            className="h-auto w-[250px] max-md:w-[200px] max-[300px]:w-[180px]"
          />
        </Link>
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
          <li className="hover:bg-orange-400 p-2 rounded-md cursor-pointer">
            <a href="/">HOME</a>
          </li>
          {LoggedInUser ? (
            <button
              onClick={handleLogout}
              className="text-black hover:bg-orange-400 p-2 rounded-md "
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/login" className="hover:bg-orange-400 p-2 rounded-md">
              LOGIN
            </Link>
          )}
          <li className="hover:bg-orange-400 p-2 rounded-md cursor-pointer">
            <a href="#contact">CONTACT</a>
          </li>
          <li className="hover:bg-orange-400 p-2 rounded-md cursor-pointer">
            <a href="/faq">FAQ's</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarLogin;
