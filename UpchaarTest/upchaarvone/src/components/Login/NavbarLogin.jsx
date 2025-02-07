import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils.js";

import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const NavbarLogin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <li>
            <a href="/" className="hover:bg-orange-400 p-2 my-1  rounded-md">
              HOME
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="hover:bg-orange-400 p-2 my-1  rounded-md"
            >
              REGISTER
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:bg-orange-400 p-2 my-1 rounded-md"
            >
              CONTACT
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:bg-orange-400 p-2 rounded-md">
              FAQ's
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarLogin;
