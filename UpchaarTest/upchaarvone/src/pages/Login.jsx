import React from "react";
import NavbarLogin from "../components/Login/NavbarLogin";
import LoginForm from "../components/Login/LoginForm";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";

const Login = () => {
  return (
    <div>
      <NavbarLogin />
      <LoginForm />
      <Contact />
      <BackToTop />
    </div>
  );
};

export default Login;
