import React from "react";
import { getImageUrl } from "../utils.js";
import Navbar from "../components/Navbar.jsx";
import NavbarLogin from "../components/Register/NavbarRegister.jsx";
import Contact from "../components/Contact.jsx";
import BackToTop from "../components/BackToTop.jsx";

const NoPage = () => {
  return (
    <>
      <NavbarLogin />
      <div className="flex items-center justify-center h-screen">
        <img
          src={getImageUrl("NoPage/errorimage.jpg")}
          alt="Error"
          className="mb-8 w-64"
        />
        <h2 className="text-4xl font-bold text-black">
          Error 404: Page Not Found!
        </h2>
      </div>
      <Contact />
      <BackToTop />
    </>
  );
};

export default NoPage;
