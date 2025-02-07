import React from "react";
import { getImageUrl } from "../utils.js";
import About from "../components/About.jsx";
import Navbar from "../components/Navbar.jsx";
import Working from "../components/Working.jsx";
import Stats from "../components/Stats.jsx";
import Contact from "../components/Contact.jsx";
import BackToTop from "../components/BackToTop.jsx";
import Footer from "../components/Footer.jsx";
const Home = () => {
  return (
    <>
      <div className="bg-slate-50 overflow-x-hidden">
        <Navbar />
        <About />
        <Working />
        <Stats />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Home;
