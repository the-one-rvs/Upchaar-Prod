import React from "react";
import NavbarRegister from "../components/Register/NavbarRegister";
import RegisterForm from "../components/Register/RegisterForm";
import BackToTop from "../components/BackToTop";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <div>
      <NavbarRegister />
      <RegisterForm />
      <BackToTop />
      <Contact />
      <Footer />
    </div>
  );
};

export default Register;
