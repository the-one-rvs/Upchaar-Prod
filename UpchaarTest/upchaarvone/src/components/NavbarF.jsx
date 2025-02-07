import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils.js";
const NavbarF = () => {
  return (
    <>
      <div className="relative flex">
        <Link to="/" className="relative top-0 left-0 z-50 pt-6 pr-2">
          <img
            src={getImageUrl("Navbar/logoupchaar.png")}
            alt="Logo"
            className="h-auto"
          />
        </Link>
        <div>
          <ul className="flex space-x-10 absolute pr-4 md:pr-10 top-4 md:top-10 right-4 md:right-14 font-sans font-bold">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/profile">PROFILE</a>
            </li>
            <li>
              <a href="#contact">CONTACT</a>
            </li>
            <li>
              <a href="/faq">FAQ's</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarF;
